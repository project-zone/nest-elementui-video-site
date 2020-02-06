<template>
  <div class="course-list">
    <avue-crud
      :data="data.data"
      :option="option"
      @row-save="createCourse"
      @row-update="updateCourse"
      @row-del="removeCourse"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'CourseCrud',
})
export default class CourseCrud extends Vue {
  data = [];

  option = {
    title: '课程管理',
    column: [
      { prop: 'name', label: '课程名称' },
      { prop: 'cover', label: '课程封面图' },
    ],
  };

  async fetch() {
    const { data } = await this.$http.get('courses');

    this.data = data;
  }

  created() {
    this.fetch();
  }

  async createCourse(row: any, done: any, loading: any) {
    await this.$http.post('courses', row);

    this.$message.success('保存成功！');
    this.fetch();
    done();
  }

  async updateCourse(row: any, index: any, done: any, loading: any) {
    const data = { ...row };

    delete data.$index;

    await this.$http.delete(`courses/${data._id}`, data);
    this.$message.success('修改成功！');
    done()
  }

  async removeCourse(row: any, index: any) {
    try {
      await this.$confirm('是否删除课程？');
      await this.$http.delete(`courses/${row._id}`);
      this.$message.success({ message: '删除成功！' });
      this.fetch();
    } catch (error) {
      return;
    }
  }
}
</script>
