<template>
  <div style="padding:10px;">
    <div class="container">
      <!--
        <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >批量删除</el-button>
        <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
          <el-option key="1" label="广东省" value="广东省"></el-option>
          <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select>
        <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      -->
      <el-row class="SearchRow">
        <el-col>
          <el-select
            v-model="query.name"
            placeholder="选择搜索列"
            @change="SearchChange()"
            style="width:120px;"
          >
            <el-option label="全部" value="all"></el-option>
            <el-option label="商品名称" value="terminal_device_group_id"></el-option>
          </el-select>
          <el-input
            placeholder="请输入搜素关键字"
            v-model="query.key"
            @keyup.native.enter="getGroupNewList()"
            @clear="getGroupNewList()"
            clearable
            class="inputSearch"
            :disabled="inputdisabled"
          >
            <el-button slot="append" icon="el-icon-search" @click.prevent="handleSearch()"></el-button>
          </el-input>
          <!--
            <el-button type="primary" @click="NewAdd()" icon="el-icon-s-custom" plain>添加商品</el-button>
          -->
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        height="520"
        max-height="520"
      >
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="用户"></el-table-column>
        <el-table-column prop="name" label="商品名"></el-table-column>
        <el-table-column prop="address" label="联系人"></el-table-column>
        <el-table-column prop="address" label="联系电话"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="address" label="快递公司"></el-table-column>
        <el-table-column prop="address" label="运单号"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state==='已签收'?'success':(scope.row.state==='派送中'?'danger':'')"
            >{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="date" label="中奖时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="query.pageIndex"
          :page-sizes="[5,10,15,20]"
          :page-size="query.pagesize"
          :total="pageTotal"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
    </div>
    <!-- 编辑弹出框 -->
    <el-dialog title="修改商品" :visible.sync="editVisible" :top="dialogtop">
      <el-form :model="form" @submit.native.prevent :rules="rules" ref="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人" :label-width="formLabelWidth" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" :label-width="formLabelWidth" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="详情地址" :label-width="formLabelWidth" prop="price">
              <el-input v-model="form.price"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="快递公司" :label-width="formLabelWidth" prop="money">
          <el-input v-model="form.money"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运单号" :label-width="formLabelWidth" prop="money">
          <el-input v-model="form.money"></el-input>
        </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input  placeholder="请输入内容" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input  placeholder="请输入内容" v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ExitEdit()">取 消</el-button>
        <el-button type="primary" @click="AddEdit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { fetchData } from '../../api/index';
export default {
  name: "basetable",
  data() {
    return {
      srcList: [],
      query: {
        address: "",
        name: "",
        key: "",
        pageIndex: 1,
        pageSize: 10
      },
      inputdisabled: true,
      tableData: [
        {
          id: 1,
          name: "张三",
          money: 123,
          address: "广东省东莞市长安镇",
          state: "成功",
          date: "2019-11-1",
          thumb: "https://lin-xin.gitee.io/images/post/wms.png"
        },
        {
          id: 2,
          name: "李四",
          money: 456,
          address: "广东省广州市白云区",
          state: "成功",
          date: "2019-10-11",
          thumb: "https://lin-xin.gitee.io/images/post/node3.png"
        },
        {
          id: 3,
          name: "王五",
          money: 789,
          address: "湖南省长沙市",
          state: "失败",
          date: "2019-11-11",
          thumb: "https://lin-xin.gitee.io/images/post/parcel.png"
        },
        {
          id: 4,
          name: "赵六",
          money: 1011,
          address: "福建省厦门市鼓浪屿",
          state: "成功",
          date: "2019-10-20",
          thumb: "https://lin-xin.gitee.io/images/post/notice.png"
        }
      ],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 4,
      form: {},
      idx: -1,
      id: -1,
      dialogFormVisibleAdd: false,
      formLabelWidth: "25%",
      dialogtop: "14vh",
      showhide: true,
      rules: []
    };
  },
  created() {
    // this.getData();
  },
  methods: {
    handleSizeChange(val) {
      this.query.pageSize = val;
    },
    handleRemove() {
      this.showhide = true;
    },
    hidebeform() {
      this.showhide = false;
    },
    SearchChange() {
      if (this.inputdisabled && this.query.key.length == 0) {
        this.inputdisabled = false;
        return;
      }
      if (this.query.name != "all") {
        this.inputdisabled = false;
        if (this.query.key.length != 0) {
          //执行切换时的操作
        }
      } else {
        this.inputdisabled = true;
        this.query.key = "";
      }
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      fetchData(this.query).then(res => {
        console.log(res);
        this.tableData = res.list;
        this.pageTotal = res.pageTotal || 50;
      });
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, "pageIndex", 1);
      this.getData();
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$message.success("删除成功");
          this.tableData.splice(index, 1);
        })
        .catch(() => {});
    },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.srcList.push(this.form.thumb);
      this.editVisible = true;
    },
    NewAdd() {
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    ExitAdd() {
      this.dialogFormVisibleAdd = false;
    },
    ExitEdit() {
      this.editVisible = false;
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      this.$set(this.tableData, this.idx, this.form);
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, "pageIndex", val);
      this.getData();
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type == "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
.box-card {
  height: 99%;
}
.inputSearch {
  width: 30%;
}
.SearchRow {
  margin: 0px 10px 10px 10px;
}
.uploade {
  margin-bottom: 0px;
}
.pagination {
  padding-top: 5px;
}
</style>
