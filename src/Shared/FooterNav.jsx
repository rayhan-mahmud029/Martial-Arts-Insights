import { Footer } from 'flowbite-react';
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const FooterNav = () => {
    return (
        <Footer container>
            <div className="w-full  p-10">
                <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1 text-white z-10">
                    <div className="flex flex-col gap-8">

                        <div style={{ color: "white" }}>
                            <Footer.Brand
                                alt="Martial Arts Logo"
                                href="/"
                                name="Martial Arts Insights"
                                src="https://i.ibb.co/m0QDYYJ/pngwing-com.png"
                                className='font-poppins font-extrabold'
                            />
                        </div>

                        <div className="mt-4 text-xl flex space-x-6 sm:mt-0 sm:justify-center">
                            <Footer.Icon
                                href="#"
                                icon={FaFacebook}
                            />
                            <Footer.Icon
                                href="#"
                                icon={FaInstagram}
                            />
                            <Footer.Icon
                                href="#"
                                icon={FaTwitter}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6 font-sans">
                        <div>
                            <Footer.Title title="about" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#">
                                    About US
                                </Footer.Link>
                                <Footer.Link href="#">
                                    Contact US
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Follow us" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#">
                                    Facebook
                                </Footer.Link>
                                <Footer.Link href="#">
                                    Instagram
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Legal" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#">
                                    Privacy Policy
                                </Footer.Link>
                                <Footer.Link href="#">
                                    Terms & Conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider />
                <div className="w-full sm:flex sm:items-center sm:justify-center">
                    <Footer.Copyright
                        by="Martial Arts Insights™"
                        href="#"
                        year={2023}
                    />
                </div>
            </div>
        </Footer>
    );
};

export default FooterNav;