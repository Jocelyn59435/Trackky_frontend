import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Image from 'next/dist/client/image';
import { useForm, SubmitHandler } from 'react-hook-form';

type SearchResultProps = {
  userid: string;
  product_image_src: string;
  product_name: string;
  original_price: number;
};

type AddToTrackListData = {
  desired_price: number;
};

export function SearchResult(props: SearchResultProps) {
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
  } = useForm<AddToTrackListData>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<AddToTrackListData> = async (formData) => {
    await {
      variables: {
        url: formData.desired_price,
      },
    };
  };
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
            <label className='font-bold'>Desired Price:&nbsp;</label>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='col-span-3'>
              <input
                className='w-full border-darkgrey border-2 rounded-lg  hover:border-indigo focus:bg-transparent'
                type='number'
                placeholder='Desired Price'
                {...register('desired_price', {
                  maxLength: {
                    value: 4,
                    message: 'Maximum length is 4 digits.',
                  },
                })}
              />
            </div>
            {errors.desired_price && (
              <p className='text-red'>{errors.desired_price.message}</p>
            )}
            <div className='mt-4'>
              <button
                className='w-full text-center h-10 rounded-md bg-indigo-400 text-grey hover:bg-indigo disabled:opacity-50 text-lg font-bold'
                type='submit'
              >
                Add to Track List
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
