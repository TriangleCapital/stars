import React, { useState } from 'react';
import { Upload, message, Button, Input } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { File } from 'buffer';

const { Dragger } = Upload;
const { TextArea } = Input;

export default function Lobby() {
  const [file, setFile] = useState<File | null>(null);
  const [importantMessage, setImportantMessage] = useState('');
  const [isEditing, setIsEditing] = useState(true);

  // Handle file upload
  const handleUpload = (info: any) => {
    const { file } = info;
    if (file.status === 'done') {
      setFile(file);
      message.success(`${file.name} file uploaded successfully.`);
    } else if (file.status === 'error') {
      message.error(`${file.name} file upload failed.`);
    }
  };

  // Handle saving the important message
  const handleSaveMessage = () => {
    setIsEditing(false);
    message.success('Message saved successfully.');
  };

  // Handle editing the important message
  const handleEditMessage = () => {
    setIsEditing(true);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Section 1: Drag & Drop for Excel File */}
      <section>
        <h2 className="text-xl font-bold mb-4">Upload Excel File</h2>
        <Dragger
          name="file"
          multiple={false}
          accept=".xlsx, .xls"
          onChange={handleUpload}
          beforeUpload={() => false} // Prevent automatic upload
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag an Excel file to this area to upload</p>
          <p className="ant-upload-hint">Supports .xlsx and .xls files</p>
        </Dragger>
        {file && (
          <div className="mt-4">
            <p>Uploaded File: {file.name}</p>
          </div>
        )}
      </section>

      {/* Section 2: Important Message */}
      <section>
        <h2 className="text-xl font-bold mb-4">Important Message</h2>
        {isEditing ? (
          <div className="space-y-4">
            <TextArea
              rows={4}
              value={importantMessage}
              onChange={(e) => setImportantMessage(e.target.value)}
              placeholder="Write your important message here..."
            />
            <Button type="primary" onClick={handleSaveMessage}>
              Save Message
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="whitespace-pre-line">{importantMessage}</p>
            </div>
            <Button type="primary" onClick={handleEditMessage}>
              Edit Message
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
