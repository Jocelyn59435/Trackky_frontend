import { motion } from 'framer-motion';
import Image from 'next/dist/client/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCheckProductPriceByUrlLazyQuery } from '../../graphql/generated';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { SearchResult } from './SearchResult';

type SearchProductByUrlData = {
  url: string;
};

type SearchFormProps = {
  userId: string;
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

export default function SearchForm(props: SearchFormProps) {
  const [
    checkProductPriceByUrl,
    {
      data: checkPriceQueryData,
      loading: checkPriceQueryLoading,
      error: checkPriceQueryError,
    },
  ] = useCheckProductPriceByUrlLazyQuery();
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
  } = useForm<SearchProductByUrlData>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<SearchProductByUrlData> = async (formData) => {
    await checkProductPriceByUrl({
      variables: {
        url: formData.url,
      },
    });
  };
  return (
    <>
      <div className='mx-auto lg:w-2/3 md:w-5/6 sm:w-11/12 p-4 '>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='grid sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-2 '>
            <div className='sm:col-span-3 md:col-span-5 lg:col-span-5'>
              <input
                type='search'
                className='w-full border-darkgrey border-2 rounded-lg h-10 hover:border-indigo focus:bg-transparent'
                placeholder='Please enter your product URL'
                {...register('url', {
                  required: 'This is required.',

                  pattern: {
                    value:
                      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
                    message: 'Invalid product link.',
                  },
                })}
              />
            </div>

            <motion.div
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.8 }}
            >
              {checkPriceQueryLoading ? (
                <div
                  className='w-full
           h-10 rounded-md bg-indigo-400 text-grey hover:bg-indigo text-lg text-center font-bold items-center align-middle'
                >
                  <span>Fetching ...</span>
                </div>
              ) : (
                <input
                  disabled={!isDirty || !isValid}
                  type='submit'
                  className='w-full h-10 rounded-md bg-indigo-400 text-grey hover:bg-indigo disabled:opacity-50 text-lg font-bold'
                />
              )}
            </motion.div>
          </div>
          <div>
            {errors.url && <p className='text-red'>{errors.url.message}</p>}
            {checkPriceQueryError && (
              <p className='text-red'>{checkPriceQueryError.message}</p>
            )}
          </div>
        </form>
        {checkPriceQueryData && (
          <SearchResult
            product_image_src={
              checkPriceQueryData?.checkProductPriceByUrl?.product_image_src
            }
            product_name={
              checkPriceQueryData?.checkProductPriceByUrl?.product_name
            }
            original_price={
              checkPriceQueryData?.checkProductPriceByUrl?.original_price
            }
          />
        )}
        {/* {checkPriceQueryData && (
          <div className='flex w-full align-middle justify-center mt-10 space-x-10'>
            <div>
              <Image
                src={
                  checkPriceQueryData?.checkProductPriceByUrl?.product_image_src
                }
                width={150}
                height={200}
              />
            </div>
            <div className='w-full grid grid-cols-4 gap-4'>
              <div className='col-span-4'>
                <p className='text-2xl'>
                  {checkPriceQueryData?.checkProductPriceByUrl?.product_name}
                </p>
              </div>
              <div>
                <p>
                  <span className='font-bold'>Price:&nbsp;</span>
                </p>
              </div>

              <div className='col-span-3'>
                <span>
                  {checkPriceQueryData?.checkProductPriceByUrl?.original_price}
                </span>
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
        )} */}
      </div>
    </>
  );
}
