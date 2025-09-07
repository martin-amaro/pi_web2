import React from 'react'
import { APP_NAME } from '../config';
import Link from 'next/link';
import { footerSections } from '../libs/data';

export const Footer = () => {
    const currentYear = new Date().getFullYear();


    return (
        <section className="bg-black flex flex-col p-8">
            <div className="flex flex-col w-[90%] max-w-[1400px] mx-auto ">
                <div className="w-full flex flex-wrap my-10 md:my-20">
                    {footerSections.map((section, index) => (
                        <div key={index} className="flex flex-col w-full mb-10 md:w-1/4 md:mb-0">
                            <h3 className="font-medium mb-4 text-[clamp(12px,16px,16px)] text-[#737373]">{section.title}</h3>
                            <ul className="flex flex-col gap-[0.7rem]">
                                {section.links.map((link, i) => (
                                    <NavLink key={i} href={link.href}>
                                        {link.label}
                                    </NavLink>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="w-full flex justify-between items-center mx-auto pt-8 border-t border-[rgba(128,128,128,0.35)]">
                    <div className="flex items-center text-[#737373] text-sm">
                        <p className="text-[#737373] text-[13px]">© {currentYear} {APP_NAME}, Inc.</p>
                    </div>
                    <div className="flex gap-[2px] text-white">
                        <a href="#" className=" p-1" title="Twitter">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" stroke="currentColor" fill="currentColor"><path d="M16.4 6.6v.5c0 4.8-3.3 10.1-9.3 10.1-1.9 0-3.6-.4-5-1.4.3 0 .5.1.8.1 1.5 0 3-.6 4.1-1.6-1.4 0-2.6-1.1-3.1-2.5.2 0 .4.1.6.1.3 0 .7 0 1-.1C3.9 11.4 3 9.9 3 8.1c0 .3.7.4 1.2.5-.9-.7-1.4-1.8-1.4-3 0-.7.1-1.3.4-1.8C4.8 6 7.1 7.4 9.8 7.6v-.9c0-2 1.5-3.9 3.3-3.9.9 0 1.8.7 2.4 1.4.7-.2 1.4-.5 2.1-.9-.2.8-.8 1.6-1.4 2 .6-.1 1.2-.3 1.8-.6-.4.8-1 1.4-1.6 1.9z"></path></svg>
                        </a>
                        <a href="#" className=" p-1" title="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" stroke="currentColor" fill="currentColor"><path d="m14.2 11 .4-3H11V6.3c0-.9.9-1.3 2.1-1.3h.9V2.1S12.7 2 11.6 2C9.3 2 8 3.4 8 6v2H5v3h3v7h3v-7h3.2z"></path></svg>
                        </a>
                        <a href="#" className="p-1" title="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" stroke="currentColor" fill="currentColor"><path d="M17.8 6.7c0-.9-.2-1.4-.4-1.9-.2-.6-.5-1-1-1.4-.5-.5-.9-.7-1.4-1-.5-.2-1.1-.3-1.9-.4H10c-2.1 0-2.5 0-3.3.1-.9 0-1.4.2-1.9.4-.6.2-1 .4-1.4.9-.5.4-.7.9-1 1.4-.2.6-.3 1.1-.3 2-.1.7-.1 1-.1 3.2s0 2.5.1 3.3c0 .9.2 1.4.4 1.9.2.6.5 1 1 1.4s.9.7 1.4 1c.4.2 1.1.3 1.9.4H10c2.1 0 2.4 0 3.2-.1.9 0 1.4-.2 1.9-.4.6-.2 1-.5 1.4-1 .5-.5.7-.9 1-1.4.2-.5.3-1.1.4-1.9 0-.9.1-1 .1-3.2-.1-2.1-.1-2.5-.2-3.3zm-1.4 6.5c0 .8-.2 1.2-.2 1.5-.2.4-.3.6-.6.9-.2.2-.6.5-.9.6-.3.1-.7.2-1.5.2-.9 0-1.1.1-3.2.1s-2.4 0-3.2-.1c-.8 0-1.2-.2-1.5-.2-.5-.1-.7-.2-1-.6-.2-.2-.5-.6-.6-.9-.2-.3-.3-.7-.3-1.5 0-.9-.1-1.1-.1-3.2 0-2.2 0-2.4.1-3.2 0-.8.2-1.2.2-1.5.2-.4.3-.6.6-.9.2-.2.6-.5.9-.6.5-.1.9-.3 1.7-.3.9 0 1.2-.1 3.2-.1s2.3 0 3.1.1c.8 0 1.2.2 1.5.2.4.2.6.3.9.6.3.3.5.7.6 1 .2.3.3.7.3 1.5 0 .9.1 1.1.1 3.2 0 2.2 0 2.4-.1 3.2zM10 5.9c-2.2 0-4.1 1.8-4.1 4.1s1.8 4.1 4.1 4.1 4-1.9 4-4.1-1.8-4.1-4-4.1m0 6.7c-1.4 0-2.6-1.2-2.6-2.6S8.5 7.4 10 7.4s2.6 1.2 2.6 2.6-1.2 2.6-2.6 2.6m5.1-6.8c0 .6-.4 1-1 1s-1-.4-1-1 .4-1 1-1 1 .4 1 1"></path></svg>
                        </a>
                    </div>
                </div>

            </div>
        </section>

    )
}

const NavLink = ({ children, href }: { children: React.ReactNode, href: string }) => (
    <li>
        <Link href={href} className="text-white text-[clamp(12px,15px,16px)] font-medium hover:underline;">
            {children}
        </Link>
    </li>

)