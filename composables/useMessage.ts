import { ElMessage } from 'element-plus'
import type { RendererElement, RendererNode, VNode } from 'vue'

export default function() {
    return function(str: string | VNode<RendererNode, RendererElement, { [key: string]: any; }> | Function = '', type: string = 'common', delay: number = 3): void {
        const message = ElMessage({
            message: str,
            type
        })
        setTimeout(() => {
            message.close()
        }, delay * 1000)
    }
}