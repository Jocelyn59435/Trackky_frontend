import { useEffect, useState } from 'react';
import { useGetProductByUserIdLazyQuery } from '../../graphql/generated';
import { ProductInfo } from './ProductInfo';
import { useReactiveVar } from '@apollo/client';
import { toggleProductStatus } from '../../lib/toggleProductStatus';

type FileterSectionProps = {
  userId: string;
};

export function FilterSection(props: FileterSectionProps) {
  const [activeClicked, setActiveClicked] = useState(true);

  const [getProductByUserId, { data, loading, error }] =
    useGetProductByUserIdLazyQuery({
      fetchPolicy: 'network-only', // Used for first execution
      nextFetchPolicy: 'network-only',
    });

  const state = useReactiveVar(toggleProductStatus);

  useEffect(() => {
    console.log('State in useffect filter' + state);
    getProductByUserId({
      variables: {
        userId: props.userId,
        status: activeClicked ? 'active' : 'achieved',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeClicked, state]);
  console.log('State in fileter section' + state);
  const unclickedStyle =
    'w-1/4 text-center border-0 border-indigo text-indigo font-bold text-lg hover:bg-indigo hover:text-grey';
  const clickedStyle =
    'w-1/4 text-center border-0 font-bold text-lg bg-indigo text-grey';

  return (
    <div>
      <div className='flex flex-row justify-around'>
        <div
          className={activeClicked ? clickedStyle : unclickedStyle}
          onClick={() => setActiveClicked(true)}
        >
          Active
        </div>
        <div
          className={!activeClicked ? clickedStyle : unclickedStyle}
          onClick={() => setActiveClicked(false)}
        >
          Achieved
        </div>
      </div>
      <div className='mt-20 grid gap-20 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
        {data &&
          data?.getProductByUserId.map((p) => (
            <ProductInfo
              id={p.id}
              product_name={p.product_name}
              product_link={p.product_link}
              product_image_src={p.product_image_src}
              original_price={p.original_price}
              current_price={p.current_price}
              desired_price={p.desired_price}
              user_id={p.user_id}
              key={p.id}
            />
          ))}
      </div>
    </div>
  );
}
