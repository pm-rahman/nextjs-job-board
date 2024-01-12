import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from "@/assets/logo.png"
import { Button } from './ui/button';

const Navbar = () => {
    return (
        <header className='shadow-sm'>
            <nav className='max-w-5xl px-3 py-5 flex items-center justify-between'>
                <Link href="/" className='flex items-center gap-3'>
                    <Image
                    src={logo}
                    width={40}
                    height={40}
                    alt='Flow job logo'
                    />
                    <span className='text-xl font-bold tracking-tight'>Flow Jobs</span>
                </Link>
                <Button asChild>
                    <Link href="/job/new">Post a Job</Link>
                </Button>
            </nav>
        </header>
    );
};

export default Navbar;