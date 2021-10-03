import Image from 'next/dist/client/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAddProductMutation } from '../../graphql/generated';
import { useReactiveVar } from '@apollo/client';
import { toggleProductStatus } from '../../lib/toggleProductStatus';

type SearchResultProps = {
  userid: string;
  product_image_src: string;
  product_name: string;
  product_link: string;
  original_price: number;
};

type AddToTrackListData = {
  desired_price: string;
};

export function SearchResult(props: SearchResultProps) {
  const [addProductMutation, { data, loading, error }] =
    useAddProductMutation();
  const state = useReactiveVar(toggleProductStatus);
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
  } = useForm<AddToTrackListData>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<AddToTrackListData> = async (formData) => {
    await addProductMutation({
      variables: {
        input: {
          product_link: props.product_link,
          desired_price: parseFloat(formData.desired_price),
          userId: props.userid,
        },
      },
    });
    toggleProductStatus(!state);
  };
  return (
    <>
      <div className='flex w-full align-middle justify-center mt-10 space-x-10'>
        <div>
          <Image
            src={props.product_image_src || '/trackky_header.png'}
            width={200}
            height={200}
            alt='product image'
          />
        </div>
        <div className='w-full grid grid-cols-4 gap-4'>
          <div className='col-span-4'>
            <p className='text-2xl'>{props.product_name}</p>
          </div>
          <div>
            <span className='font-bold'>Price:</span>
          </div>

          <div className='col-span-3'>
            <span>{props.original_price}</span>
          </div>

          <div>
            <label className='font-bold'>Desired Price:</label>
          </div>
          <div className='col-span-3'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className='w-full border-darkgrey border-2 rounded-lg  hover:border-indigo focus:bg-transparent'
                type='number'
                {...register('desired_price', {
                  maxLength: {
                    value: 4,
                    message: 'Maximum length is 4 digits.',
                  },
                  validate: (value) => parseFloat(value) < props.original_price,
                })}
              />

              {errors.desired_price && (
                <p className='text-red'>{errors.desired_price.message}</p>
              )}
              <div className='mt-4'>
                {loading ? (
                  <div className='w-full text-center h-10 rounded-md bg-indigo-400 text-grey hover:bg-indigo text-lg font-bold'>
                    <p className='m-auto'>Loading...</p>
                  </div>
                ) : (
                  <button
                    disabled={!isDirty || !isValid}
                    className='w-full text-center h-10 rounded-md bg-indigo-400 text-grey hover:bg-indigo disabled:opacity-50 text-lg font-bold'
                    type='submit'
                  >
                    Add to Track List
                  </button>
                )}
              </div>
              {error && <p className='text-red'>{error.message}</p>}
              {data && <p>Congrats! Your product is added successfully.</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
