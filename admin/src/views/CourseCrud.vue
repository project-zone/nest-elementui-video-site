<template>
  <div class="course-list">
    <avue-crud
      v-if="option.column"
      :data="data.data"
      :option="option"
      @row-save="createCourse"
      @row-update="updateCourse"
      @row-del="removeCourse"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'ResourceCrud',
})
export default class ResourceCrud extends Vue {
  @Prop(String) resource!: string

  data = [];

  option = {};

  async fetch() {
    const { data } = await this.$http.get(`${this.resource}`);

    this.data = data;
  }

  async fetchOption() {
    const { data } = await this.$http.get(`${this.resource}/option`)

    this.option = data
  }

  created() {
    this.fetch();
    this.fetchOption()
  }

  async createCourse(row: any, done: any, loading: any) {
    await this.$http.post(`${this.resource}`, row);

    this.$message.success('保存成功！');
    this.fetch();
    done();
  }

  async updateCourse(row: any, index: any, done: any, loading: any) {
    const data = { ...row };

    delete data.$index;

    await this.$http.put(`${this.resource}/${data._id}`, data);
    this.$message.success('修改成功！');
    this.fetch()
    done()
  }

  async removeCourse(row: any, index: any) {
    try {
      await this.$confirm('是否删除课程？');
      await this.$http.delete(`${this.resource}/${row._id}`);
      this.$message.success({ message: '删除成功！' });
      this.fetch();
    } catch (error) {
      return;
    }
  }
}
</script>
