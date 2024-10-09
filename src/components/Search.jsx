import React from 'react';
import { Button } from './ui/button';

function Search({ setText, text, handlesubmit }) {
  return (
    <div className='flex mb-10 mt-10 w-full justify-end'>
      <form onSubmit={handlesubmit}>
        <input
          className='border-b-2 border-black bg-white mr-8 p-1 pl-2'
          placeholder='Request a feature'
          type='text'
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <Button
          variant='destructive'
          className='mr-4 bg-need-blue text-white hover:cursor-pointer hover:opacity-65'
        >
          Request{' '}
        </Button>
      </form>
    </div>
  );
}

export default Search;
