import { FC, useEffect, useMemo, useState, useRef } from 'react'
import ReactQuill, { Quill, ReactQuillProps } from 'react-quill';
// import ImageResize from 'quill-image-resize-module-react'
import 'react-quill/dist/quill.snow.css'; // 富文本样式
// Quill.register('modules/imageResize', ImageResize); // 注册图片缩放
const RichEditor: FC = () => {
    
    const [quill, setQuill] = useState<any>('')
    const quillEdit = useRef(null)
    const uploadImages = () => {}
    const handleChange = (v: any) => {
        console.log(v)
    }
    const quillOptions = useMemo((): any => {
        return {
            'toolbar': {
                container: [
                    [{ header: [1, 2, 3, 4, 5, false] }],
                    [
                        'bold',
                        'italic',
                        'underline',
                        'strike',
                        'blockquote',
                        'image',
                    ],
                    [
                        { list: 'ordered' },
                        { list: 'bullet' },
                        { color: [] },
                        { background: [] },
                        { align: [] },
                    ],
                ],
                handlers: {
                    image: uploadImages
                }
            }
        }
    }, [])
    useEffect(() => {
        console.log(quill)
    }, [quill])
    return (
        <div id='editor' style={{ height: '100%' }}>
            <ReactQuill
                style={{ height: '80%' }}
                theme='snow'
                value={quill}
                ref={quillEdit}
                modules={quillOptions}
                placeholder='请输入'
                onChange={handleChange}>
                    <div></div>
            </ReactQuill>
        </div>
    )
}

export default RichEditor