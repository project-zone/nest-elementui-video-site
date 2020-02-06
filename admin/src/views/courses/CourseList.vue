<template>
  <div class="course-list">
    <h3>课程列表</h3>
    <el-table :data="data.data" border stripe>
      <el-table-column
        v-for="(field, key) in fields"
        :prop="key"
        :key="key"
        :label="field.label"
        :width="field.width"
      >
      </el-table-column>
      <el-table-column label="操作" :width="200" v-slot="scope">
        <el-button size="small" type="primary" @click="$router.push(`/courses/edit/${ scope.row._id }`)">编辑</el-button>
        <el-button size="small" type="primary">删除</el-button>
         </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'CourseList',
})
export default class CourseList extends Vue {
  data = [];

  fields = {
    _id: { label: 'ID' },
    name: { label: '课程名称' },
    cover: { label: '课程封面图' },
  };

  async fetch() {
    const { data } = await this.$http.get('courses');

    this.data = data;
  }

  created() {
    this.fetch();
  }
}
</script>
