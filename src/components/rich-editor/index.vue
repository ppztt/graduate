<template>
    <quill-editor
        v-model="localValue"
        :options="editorOptions"
        :disabled="props.readonly"
    />
</template>

<script setup>
    // 一生之敌npm install @vueup/vue-quill@alpha --save
    import { QuillEditor } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css'
    // require styles
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import { defineProps, onMounted, computed, defineEmits, reactive } from 'vue'
    import editorOption from './editorOption.js'
    const emit = defineEmits(['input'])
    const props = defineProps({
            value: {
                type: String,
                default: ''
            },
            toolbar: {
                type: Array
            },
            theme: {
                type: String,
                default: 'snow'
            },
            placeholder: {
                type: String,
                default: '请输入内容...'
            },
            customOptions: {
                type: Object,
                default: () => ({})
            },
            readonly: {
                type: Boolean,
                default: false
            }
        })
    let editorOptions = reactive({
                ...editorOption,
                thepme: props.theme,
                placeholder: props.placeholder,
                ...props.customOptions
            })
    const localValue = computed({
        get: () => {
            return props.value
        },
        set: (newValue)=> {
            emit('input', newValue)
        }
    })
    onMounted(() => {
        if (props.toolbar) {
            editorOption.modules.toolbar = props.toolbar
        }
    })
</script>

<style lang="scss" scoped>
:deep(.ql-toolbar.ql-snow) {
    border-radius: 4px 4px 0 0;
}
:deep(.ql-toolbar.ql-snow + .ql-container.ql-snow ){
    border-radius: 0 0 4px 4px;
}
</style>
