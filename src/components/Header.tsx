import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useAuth } from '../../lib/useAuth';

type HeaderProps = {
  notSignedIn?: boolean;
  isLandingPage?: boolean;
};

export default function Header(props: HeaderProps) {
  const { setToken } = useAuth();
  return (
    <>
      <div className='bg-indigo py-3 flex justify-between items-center'>
        <div className='p-2 cursor-pointer'>
          <a href='/' className='cursor-pointer'>
            <Image
              layout='fixed'
              src='/trackky_header.png'
              width={180}
              height={50}
            />
          </a>
        </div>
        {props.notSignedIn && (
          <Link href='/signin'>
            <motion.div
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.8 }}
            >
              <button className='lg:mr-20 md:mr-10 sm: mr-5 w-28 h-12 font-bold bg-grey text-indigo text-center rounded-lg text-xl'>
                Log In
              </button>
            </motion.div>
          </Link>
        )}
        {props.isLandingPage && (
          <Link href='/'>
            <motion.div
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.8 }}
            >
              <button
                onClick={() => setToken(null)}
                className='lg:mr-20 md:mr-10 sm: mr-5 w-28 h-12 font-bold bg-grey text-indigo text-center rounded-lg text-xl'
              >
                Log Out
              </button>
            </motion.div>
          </Link>
        )}
      </div>
    </>
  );
}
