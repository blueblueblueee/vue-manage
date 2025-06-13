<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch">
      <el-form-item label="订单管理" prop="deptName">
        <el-input
            v-model="orderName"
            placeholder="请输入订单名称"
            clearable
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="订单状态" clearable>
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="info"
            plain
            icon="el-icon-sort"
            size="mini"
            @click="toggleExpandAll"
        >展开/折叠</el-button>
      </el-col>
    </el-row>

    <el-table
        v-if="refreshTable"
        v-loading="loading"
        :data="deptList"
        row-key="deptId"
        :default-expand-all="isExpandAll"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="deptName" label="部门名称" width="260"></el-table-column>
      <el-table-column prop="orderNum" label="排序" width="200"></el-table-column>
      <el-table-column prop="status" label="状态" width="100"></el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="200"></el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
              size="mini"
              type="text"
              icon="el-icon-plus"
              @click="handleAdd(scope.row)"
          >新增</el-button>
          <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改部门对话框 -->
<!--    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>-->
<!--      <el-form ref="form" :model="form" :rules="rules" label-width="80px">-->
<!--        <el-row>-->
<!--          <el-col :span="24" v-if="form.parentId !== 0">-->
<!--            <el-form-item label="上级部门" prop="parentId">-->
<!--              <treeselect v-model="form.parentId" :options="deptOptions" :normalizer="normalizer" placeholder="选择上级部门" />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="部门名称" prop="deptName">-->
<!--              <el-input v-model="form.deptName" placeholder="请输入部门名称" />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="显示排序" prop="orderNum">-->
<!--              <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="负责人" prop="leader">-->
<!--              <el-input v-model="form.leader" placeholder="请输入负责人" maxlength="20" />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="联系电话" prop="phone">-->
<!--              <el-input v-model="form.phone" placeholder="请输入联系电话" maxlength="11" />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="邮箱" prop="email">-->
<!--              <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="部门状态">-->
<!--              <el-radio-group v-model="form.status">-->
<!--                <el-radio-->
<!--                    v-for="dict in dict.type.sys_normal_disable"-->
<!--                    :key="dict.value"-->
<!--                    :label="dict.value"-->
<!--                >{{dict.label}}</el-radio>-->
<!--              </el-radio-group>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button type="primary" @click="submitForm">确 定</el-button>-->
<!--        <el-button @click="cancel">取 消</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
// import { listDept, getDept, delDept, addDept, updateDept, listDeptExcludeChild } from "@/api/system/dept"
// import Treeselect from "@riophae/vue-treeselect"
// import "@riophae/vue-treeselect/dist/vue-treeselect.css"

export default {
  name: "Dept",
  data() {
    return {
      queryParams: {},
      deptList: [],
      refreshTable: false,
      showSearch: false,

      //订单状态
      options: [{
        value: 1,
        label: '已支付'
      }, {
        value: 2,
        label: '未支付'
      }],

      // 表单参数
      form: {},
      // 表单校验
      rules: {
        // parentId: [
        //   { required: true, message: "上级部门不能为空", trigger: "blur" }
        // ],
        // deptName: [
        //   { required: true, message: "部门名称不能为空", trigger: "blur" }
        // ],
        // orderNum: [
        //   { required: true, message: "显示排序不能为空", trigger: "blur" }
        // ],
        // email: [
        //   {
        //     type: "email",
        //     message: "请输入正确的邮箱地址",
        //     trigger: ["blur", "change"]
        //   }
        // ],
        // phone: [
        //   {
        //     pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        //     message: "请输入正确的手机号码",
        //     trigger: "blur"
        //   }
        // ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询部门列表 */
    getList() {

    },

    // 表单重置
    reset() {

    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {

    },
    /** 新增按钮操作 */
    handleAdd(row) {

    },
    /** 展开/折叠操作 */
    toggleExpandAll() {
      this.refreshTable = false
      this.isExpandAll = !this.isExpandAll
      this.$nextTick(() => {
        this.refreshTable = true
      })
    },


    /** 删除按钮操作 */
    handleDelete(row) {

    }
  }
}
</script>