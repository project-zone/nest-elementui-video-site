<template>
  <div class="course-list">
    <h3>{{pageTitle}}</h3>
    <ele-form :form-data="data" :form-desc="fields"></ele-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'CourseEdit',
})
export default class CourseEdit  extends Vue {
  @Prop(String) id!: string

  data = {}

  fields = {
    name: { label: '课程名称', type: 'input'},
    cover: { label: '课程封面图', type: 'input' },
  }

  get pageTitle() {
    return `${!this.id ? '创建': '编辑'}课程`
  }

  async fetch() {

  }

  created() {
    // this.fetch()
  }

}
</script>
