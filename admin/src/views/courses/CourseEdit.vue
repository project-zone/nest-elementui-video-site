<template>
  <div class="course-list">
    <h3>{{ pageTitle }}</h3>
    <ele-form
      :form-data="data"
      :form-desc="fields"
      :request-fn="submit"
    ></ele-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'CourseEdit',
})
export default class CourseEdit extends Vue {
  @Prop(String) id!: string;

  data = {}

  fields = {
    name: { label: '课程名称', type: 'input' },
    cover: { label: '课程封面图', type: 'input' },
  };

  get isNew() {
    return !this.id
  }

  get pageTitle() {
    return `${this.id ? '创建' : '编辑'}课程`;
  }

  created() {
    !this.isNew && this.fetch()
  }

  async fetch() {
    const { data } = await this.$http.get(`courses/${this.id}`)

    this.data = data
  }

  async submit(data: any) {
    const url = this.isNew ? 'courses' : `courses/${this.id}`
    const method = this.isNew ? 'post' : 'put'

    await this.$http[method](url, data);
    this.$message.success({ message: '保存成功！' })
    this.data = {}
    this.$router.go(-1)
  }

}
</script>
