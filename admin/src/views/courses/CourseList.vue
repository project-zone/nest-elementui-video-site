<template>
  <div class="course-list">
    <h3>课程列表</h3>
    <div>
      <el-button
        type="primary"
        size="small"
        @click="$router.push('/courses/create')"
      >
        创建
      </el-button>
    </div>
    <el-table :data="data.data" border stripe>
      <el-table-column
        v-for="(field, key) in fields"
        :prop="key"
        :key="key"
        :label="field.label"
        :width="field.width"
      >
      </el-table-column>
      <el-table-column label="操作" :width="200" v-slot="{ row }">
        <el-button
          size="small"
          type="primary"
          @click="$router.push(`/courses/edit/${row._id}`)"
        >
          编辑
        </el-button>
        <el-button size="small" type="danger" @click="deleteCourse(row)">
          删除
        </el-button>
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

  async deleteCourse(row: any) {
    try {
      await this.$confirm('是否删除课程？');
      await this.$http.delete(`courses/${row._id}`);
      this.$message.success({ message: '删除成功！' })
      this.fetch();
    } catch (error) {
      return;
    }
  }
}
</script>
