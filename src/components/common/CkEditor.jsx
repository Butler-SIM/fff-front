import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editor = ({ onChange }) => {
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    onChange(data); // 내용이 변경될 때마다 상태 업데이트
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data=""
      onReady={(editor) => {
        // console.log("Editor is ready to use!", editor);
      }}
      onChange={handleEditorChange}
      onBlur={(event, editor) => {
        // console.log("Blur.", editor);
      }}
      onFocus={(event, editor) => {
        // console.log("Focus.", editor);
      }}
    />
  );
};

export default Editor;
