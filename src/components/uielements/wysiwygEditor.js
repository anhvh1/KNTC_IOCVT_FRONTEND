import React, {useEffect, useState} from 'react';
import EditorWrapper from './styles/wysiwygEditor.style';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {getBase64Async} from '../../helpers/utility';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function (props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const {htmlRaw, onDone} = props;

  useEffect(() => {
    if (htmlRaw) {
      const contentBlock = htmlToDraft(htmlRaw);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks,
        );
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
      }
    }
  }, []);

  const onEditorStateChange = (value) => {
    if (onDone) {
      let html = draftToHtml(convertToRaw(value.getCurrentContent()));
      const searchRegExp = /text-align:none;/g;
      const replaceWith = 'text-align:center;';
      html = html.replace(searchRegExp, replaceWith);
      onDone(html);
    }
    setEditorState(value);
  };

  const uploadCallback = async (file) => {
    const base64 = await getBase64Async(file);
    return new Promise((resolve, reject) => {
      resolve({data: {link: base64}});
    });
  };

  const toolbar = {
    options: [
      'inline',
      'fontSize',
      'list',
      'textAlign',
      'colorPicker',
      'link',
      'embedded',
      'emoji',
      'image',
      'history',
    ],
    inline: {
      inDropdown: false,
      options: ['bold', 'italic', 'underline', 'strikethrough'],
    },
    fontSize: {
      options: [10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
    },
    fontFamily: {
      options: [
        'Arial',
        'Georgia',
        'Impact',
        'Tahoma',
        'Times New Roman',
        'Verdana',
      ],
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
    },
    list: {
      options: ['unordered', 'ordered'],
    },
    link: {
      options: ['link'],
    },
    image: {
      previewImage: true,
      urlEnabled: true,
      uploadCallback: uploadCallback,
      alignmentEnabled: false,
      defaultSize: {
        height: 400,
        width: 500,
      },
    },
  };

  return (
    <EditorWrapper>
      <Editor
        toolbar={toolbar}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </EditorWrapper>
  );
}
