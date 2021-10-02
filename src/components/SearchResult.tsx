import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Image from 'next/dist/client/image';

type SearchResultProps = {
  product_image_src: string;
  product_name: string;
  original_price: number;
};

const PrettoSlider = styled(Slider)({
  color: '#5c6ac4',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#5c6ac4',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

export function SearchResult(props: SearchResultProps) {
  return (
    <>
      <div className='flex w-full align-middle justify-center mt-10 space-x-10'>
        <div>
          <Image
            src={props.product_image_src || '/trackky_header.png'}
            width={150}
            height={200}
            alt='product image'
          />
        </div>
        <div className='w-full grid grid-cols-4 gap-4'>
          <div className='col-span-4'>
            <p className='text-2xl'>{props.product_name}</p>
          </div>
          <div>
            <p>
              <span className='font-bold'>Price:&nbsp;</span>
            </p>
          </div>

          <div className='col-span-3'>
            <span>{props.original_price}</span>
          </div>

          <div>
            {' '}
            <label className='font-bold'>Desired Price:&nbsp;</label>
          </div>
          <div className='col-span-3'>
            <input
              className='w-full border-darkgrey border-2 rounded-lg  hover:border-indigo focus:bg-transparent'
              type='number'
            />
          </div>

          <div>
            <label className='font-bold'>Desired Discount:&nbsp;</label>
          </div>
          <div className='col-span-3'>
            <PrettoSlider
              valueLabelDisplay='auto'
              aria-label='pretto slider'
              //getAriaValueText={valuetext}
              defaultValue={0}
              step={0.01}
              min={0}
              max={1}
            />
          </div>
          <div className='col-span-4'>
            {' '}
            <button
              className='w-full text-center h-10 rounded-md bg-indigo-400 text-grey hover:bg-indigo disabled:opacity-50 text-lg font-bold'
              type='submit'
            >
              Add to Track List
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
