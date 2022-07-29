import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Image from 'next/image';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';

const Navbar = () => {
  return (
    <div>
      <Link>
        <div>
          <Image 
            className='cursor-pointer'
          />
        </div>
      </Link>
    </div>
  )
}

export default Navbar;