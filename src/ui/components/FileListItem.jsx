import { h } from 'preact';
import { shell, clipboard, ipcRenderer } from 'electron';
import { basename, extname } from 'path';


const FileListItem = ({ file, url }) => (
    <li className="file_list_item">
        <span class="icon icon-doc-text file_list_item--icon " />
        <p className="file_list_item--name">
            { `${basename(file.relativePath, extname(file.relativePath))}${extname(file.relativePath).toLowerCase()}` }
        </p>
        { file.hash && [
            <div
              className="file_list_item--button"
              onClick={() => {
                  clipboard.writeText(url, 'selection');
                  ipcRenderer.send('notification', 'Link copied!');
              }}
            >
                <span class="icon icon-link" />
            </div>,
            <div
              className="file_list_item--button"
              onClick={() => {
                  shell.openExternal(url);
                  ipcRenderer.send('hide');
              }}
            >
                <span class="icon icon-forward" />
            </div>,
        ]}
    </li>
);

export default FileListItem;
