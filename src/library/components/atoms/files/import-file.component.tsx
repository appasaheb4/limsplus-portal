import React from 'react';
import Files from 'react-files';
import { Icons } from '@/library/components';

interface ImportFileProps {
  accepts?: Array<string>;
  onClick: (item: any) => void;
}
export const ImportFile = ({
  accepts = ['.csv'],
  onClick,
}: ImportFileProps) => {
  return (
    <div className='flex justify-center'>
      <Files
        className='files-dropzone'
        onChange={files => {
          onClick(files);
        }}
        onError={(error, file) => {
          console.log('error code ' + error.code + ': ' + error.message);
        }}
        accepts={['.xlsx', '.xls', '.csv']}
        // accepts={accepts}
        multiple={false}
        maxFileSize={10_000_000}
        minFileSize={0}
        clickable
      >
        <div className='flex flex-col items-center justify-center p-14  md:px-80 bg-gray-200 dark:bg-boxdark border-dashed border-2 border-indigo-600 shadow-2xl'>
          <Icons.RIcon nameIcon='FiUploadCloud' propsIcon={{ size: 40 }} />
          <div className='flex flex-col mt-4'>
            <span>Drop .csv file to upload or click here to choose file</span>
            <span>The column headers must be in the first row.</span>
          </div>
        </div>
      </Files>
    </div>
  );
};
