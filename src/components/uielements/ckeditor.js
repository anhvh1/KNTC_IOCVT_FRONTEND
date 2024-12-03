import React, {Component} from 'react';
import {useState} from 'react';
// import {CKEditor, CKEditorContext} from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import {useState} from 'react';
// import {Bold, Italic} from '@ckeditor/ckeditor5-basic-styles';
// import {Essentials} from '@ckeditor/ckeditor5-essentials';
// import {Paragraph} from '@ckeditor/ckeditor5-paragraph';
// import {Context} from '@ckeditor/ckeditor5-core';
// import {CKFinder} from '@ckeditor/ckeditor5-ckfinder';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditorApp = (props) => {
  const {data, onChange, key} = props;
  return (
    <div className="App">
      <CKEditor
        style={{minHeight: 400}}
        key={key}
        editor={ClassicEditor}
        config={{
          // plugins: [CKFinder],
          toolbar: [
            // 'ckfinder',
            'undo',
            'redo',
            '|',
            'heading',
            '|',
            'bold',
            'italic',
            '|',
            'link',
            // 'uploadImage',
            'insertTable',
            'mediaEmbed',
            '|',
            'bulletedList',
            'numberedList',
            'outdent',
            'indent',
          ],
          ckfinder: {
            uploadUrl:
              'https://qlkhhoabinhapi.gosol.com.vn/api/v1/Nguoidung/DangNhap',
            options: {
              resourceType: 'Images',
            },
          },
        }}
        data={data}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
};

export default CKEditorApp;
