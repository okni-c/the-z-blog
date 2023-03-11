import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Image from '@tiptap/extension-image'
import Italic from '@tiptap/extension-italic'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Youtube from '@tiptap/extension-youtube'
import History from '@tiptap/extension-history'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import { EditorContent, useEditor } from '@tiptap/react'
import { BsImageFill, BsYoutube } from 'react-icons/bs'
import { MdHorizontalRule } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'
import { FaSignOutAlt, FaSignInAlt } from 'react-icons/fa'
import { BiItalic, BiBold, BiUnderline, BiLink, BiMailSend } from 'react-icons/bi'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Toast } from 'primereact/toast';
import { type NextPage } from "next";
import Head from "next/head";
import { IoMdAddCircleOutline } from 'react-icons/io'
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import { format } from 'date-fns'
import { trpc } from '../../utils/trpc';
import Nav from '../../components/Nav'
import { useSession, signIn, signOut } from "next-auth/react"
import Footer from '../../components/Footer'


const Admin: NextPage = () => {
    const { data: session } = useSession();

    const [postData, setPostData] = useState({
        title: '',
        body: '',
        Date: '',
        author: '',
        thumbnail: '',
        id: '6379e61238b41a17eb9c7ef7'
    });

    const posts = trpc.get.allPosts.useQuery();

    const sendData = (post: any) => {
        if (post === null) {
            setPostData({
                title: '',
                Date: '',
                author: 'Dallas Yatsinko',
                thumbnail: '/blog-imgs/',
                body: '',
                id: '6379e61238b41a17eb9c7ef7'
            })
            return
        }
        setPostData(post);
    }

    const [formState, setFormState] = useState({
        title: '',
        author: 'Dallas Yatsinko',
        thumbnail: '',
        id: 'none'
    });

    const toast: any = useRef(null);
    const toastBC: any = useRef(null);

    const utils = trpc.useContext();

    const createPost = trpc.send.newPost.useMutation();
    const destroy = trpc.send.destroyPost.useMutation();

    const editor: any = useEditor({
        extensions: [
            Document,
            Paragraph,
            ListItem.configure({
                HTMLAttributes: {
                    class: 'blog-list'
                }
            }),
            BulletList,
            Text,
            Bold,
            Image.configure({
                HTMLAttributes: {
                    class: "rounded-xl mx-auto aspect-video object-cover drop-shadow-lg w-full"
                }
            }),
            Italic,
            Link,
            Underline,
            History,
            Youtube.configure({
                HTMLAttributes: {
                    class: 'w-full rounded-xl drop-shadow-xl aspect-video max-w-fit cursor-move',
                }
            }),
            HorizontalRule.configure({
                HTMLAttributes: {
                    class: 'bg-neutral-700 h-1 rounded-full border-none my-4',
                },
            }),
            Heading.configure({
                levels: [2, 3, 4, 5]
            }),
        ],
        editorProps: {
            attributes: {
                class: 'p-5 focus:outline-none',
            },
        },
        content: `<p>Hello!</p>`,
    })

    useEffect(() => {
        setFormState({
            title: postData.title,
            author: postData.author,
            thumbnail: postData.thumbnail || '/blog-imgs/',
            id: postData.id,
        })
        if (editor && !editor.isDestroyed) {
            editor.chain().focus().setContent(postData.body || `<p>New post, let's go!</p>`).run();
        }
    }, [postData, editor])

    const addImage = useCallback(() => {
        const url = window.prompt('Add the filename after the given URL:', '/blog-imgs/')

        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }, [editor])

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('Add your link here:', previousUrl)

        // cancelled
        if (url === null) {
            return
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink()
                .run()

            return
        }

        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url })
            .run()
    }, [editor])

    const addYoutubeVideo = () => {
        const url = prompt('Enter YouTube URL')

        // cancelled
        if (url === null) {
            return
        }

        editor.commands.setYoutubeVideo({
            src: url,
        })
    }

    if (!editor) {
        return null
    }

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSumbit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const newDate = format(new Date(), 'MMM dd, yyyy');
        const newPost = {
            body: editor.getHTML(),
            ...formState,
            Date: newDate,
            slug: formState.title.split(" ").join("-").toLocaleLowerCase(),
            id: formState.id
        }

        createPost.mutate(newPost, {
            onSuccess() {
                utils.get.allPosts.refetch()
            }
        })
        toastBC.current.show({ severity: 'success', summary: 'Success!', detail: 'Post created!' });
    }

    const handleDestroy = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const confirmDelete = confirm(`Are you sure you want to delete this blog?\r${postData.title}`);
        if (confirmDelete) {
            toast.current.show({ severity: 'success', summary: 'Success!', detail: 'Post deleted' });
            destroy.mutate({ id: postData.id }, {
                onSuccess() {
                    utils.get.allPosts.refetch()
                }
            });
            setFormState({
                title: '',
                author: 'Dallas Yatsinko',
                thumbnail: '/blog-imgs/',
                id: '6379e61238b41a17eb9c7ef7'
            })
            editor.chain().focus().setContent(`<p>New post, let's go!</p>`).run();
            const defaultRadio: any = document.getElementById('new-post');
            defaultRadio.checked = true;
        }
        else {
            toast.current.show({ severity: 'warn', summary: 'Canceled!', detail: 'Post was not deleted' });
        }
    }

    if (!session) {
        return (
            <>
                <Head>
                    <title>Z-Chronicles | Admin Login</title>
                    <meta name="description" content="Latests posts of the 1986 Nissan 300zx joureny!" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Nav />
                <main className='flex justify-center flex-col'>
                    <h1 className="text-5xl font-bold tracking-tight text-center mb-10">
                        Admin Login
                    </h1>
                    <button className='max-w-xs mx-auto border-2 dark:border-cyan-700 border-yellow-500 py-2 px-4 rounded-lg dark:text-white text-black font-semibold hover:bg-yellow-500 dark:hover:bg-cyan-700 flex items-center' onClick={() => signIn("discord", { callbackUrl: '/admin' })}><FaSignInAlt className='mr-2' /> Sign in</button>
                </main>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>Z-Chronicles | Admin Panel</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />
            <main>
                <div className='flex justify-between items-center'>
                    <h1>Admin Panel</h1>
                    <button className="border border-red-500 rounded-lg dark:text-white text-black font-semibold ml-auto hover:bg-red-500 py-2 px-4 my-4 flex items-center" onClick={() => signOut({ callbackUrl: '/' })}><FaSignOutAlt className='mr-2' /> Sign Out</button>
                </div>
                <div className="flex md:items-start flex-col lg:flex-row">
                    {/* Left Post data */}
                    <form className="m-0 md:pr-5 flex flex-col max-h-72 overflow-y-auto md:max-h-full my-8 lg:my-0">
                        <input type='radio' id='new-post' className='opacity-0 fixed w-0' name="1" defaultChecked />
                        <label htmlFor='new-post' className="border-green-600 border-2 rounded-xl my-2 py-2 px-4 hover:border-green-400 hover:cursor-pointer whitespace-nowrap checked:bg-green-600 flex items-center w-full" onClick={() => sendData(null)}><h5 className="m-0 flex items-center dark:text-white text-black">
                            <IoMdAddCircleOutline className="mr-2" /> Create a new post</h5>
                        </label>
                        {posts.data?.map((post: any, i) =>
                            <div className='flex flex-col w-full' key={i}>
                                <input id={post.id} type="radio" className='opacity-0 fixed w-0' name="1" />
                                <label htmlFor={post.id} className="dark:border-cyan-700 border-yellow-500 border-2 rounded-xl my-2 py-2 px-4 hover:border-yellow-300 dark:hover:border-cyan-500 hover:cursor-pointer" onClick={() => sendData(post)}><h5 className="m-0">{post.title}</h5><p className="m-0 font-normal tracking-tight">{post.Date}</p></label>
                            </div>
                        )}
                    </form>
                    {/* Right form area */}
                    <form onSubmit={handleSumbit} className='w-full'>
                        <div className='dark:border-cyan-700 border-yellow-500 border-2 rounded-xl mb-8 lg:my-2'>
                            <label htmlFor='title' className='flex flex-col'><h3 className='mx-4 my-3 mb-0'>Title</h3>
                                <input type='text' id='title' name='title' className='bg-transparent dark:border-cyan-700 border-yellow-500 border-2 rounded-md m-4 p-2 dark:text-white text-black' placeholder='The best blog yet...' maxLength={45} value={formState.title} onChange={handleChange} required />
                            </label>
                            <label htmlFor='thumbnail' className='flex flex-col'><h3 className='mx-4 my-3 mb-0'>Thumbnail Filename</h3>
                                <input type='text' id='thumbnail' name='thumbnail' className='bg-transparent dark:border-cyan-700 border-yellow-500 border-2 rounded-md m-4 p-2 dark:text-white text-black' placeholder='1.jpg' value={formState.thumbnail} onChange={handleChange} required />
                            </label>
                            <label htmlFor='author' className='flex flex-col'><h3 className='mx-4 my-3 mb-0'>Author</h3>
                                <select id="author" name="author" className='dark:bg-neutral-900 bg-neutral-200 dark:border-cyan-700 border-yellow-500 border-2 rounded-md m-4 p-2 dark:text-white text-black' value={formState.author} onChange={handleChange} required>
                                    <option value="Dallas Yatsinko" className='bg-transparent dark:text-white text-black p-2'>Dallas Yatsinko</option>
                                    <option value="Evan Wolkonoski" className='bg-transparent dark:text-white text-black p-2'>Evan Wolkonoski</option>
                                </select>
                            </label>
                        </div>
                        <section className='dark:border-cyan-700 border-yellow-500 border-2 rounded-xl'>
                            <h3 className='mx-4 my-5'>Body</h3>
                            {/* WYSIWYG Buttons */}
                            <div className='flex items-center border-b-2 dark:border-cyan-700 border-yellow-500 p-2  justify-start overflow-auto'>
                                <button type='button'
                                    onClick={() => editor.chain().focus().toggleBold().run()}
                                    className={editor.isActive('bold') ? 'border border-yellow-500 dark:border-cyan-700 rounded-lg p-2 dark:text-white text-black font-semibold dark:bg-cyan-600 bg-yellow-500 mx-1' : 'border border-yellow-500 dark:border-cyan-700 rounded-lg p-2 dark:text-white text-black font-semibold mx-1 dark:hover:bg-cyan-700 hover:bg-yellow-400 hover:opacity-70'}
                                >
                                    <BiBold />
                                </button>
                                <button type='button'
                                    onClick={() => editor.chain().focus().toggleItalic().run()}
                                    className={editor.isActive('italic') ? 'border border-yellow-500 dark:border-cyan-700 rounded-lg p-2 dark:text-white text-black font-semibold dark:bg-cyan-600 bg-yellow-500 mx-1' : 'border border-yellow-500 dark:border-cyan-700 rounded-lg p-2 dark:text-white text-black font-semibold mx-1 dark:hover:bg-cyan-700 hover:bg-yellow-400 hover:opacity-70'}
                                >
                                    <BiItalic />
                                </button>
                                <button type='button'
                                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                                    className={editor.isActive('underline') ? 'border border-yellow-500 dark:border-cyan-700 rounded-lg p-2 dark:text-white text-black font-semibold dark:bg-cyan-600 bg-yellow-500 mx-1' : 'border border-yellow-500 dark:border-cyan-700 rounded-lg p-2 dark:text-white text-black font-semibold mx-1 dark:hover:bg-cyan-700 hover:bg-yellow-400 hover:opacity-70'}
                                >
                                    <BiUnderline />
                                </button>
                                <button type='button'
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                    className={editor.isActive('heading', { level: 2 }) ? 'border border-yellow-500 dark:border-cyan-700 rounded-lg px-2 py-1 dark:text-white text-black font-semibold dark:bg-cyan-600 bg-yellow-500 mx-1' : 'border border-yellow-500 dark:border-cyan-700 rounded-lg px-2 py-1 dark:text-white text-black font-semibold mx-1 dark:hover:bg-cyan-700 hover:bg-yellow-400 hover:opacity-70'}
                                >
                                    H2
                                </button>
                                <button type='button'
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                                    className={editor.isActive('heading', { level: 3 }) ? 'border border-yellow-500 dark:border-cyan-700 rounded-lg px-2 py-1 dark:text-white text-black font-semibold dark:bg-cyan-600 bg-yellow-500 mx-1' : 'border border-yellow-500 dark:border-cyan-700 rounded-lg px-2 py-1 dark:text-white text-black font-semibold mx-1 dark:hover:bg-cyan-700 hover:bg-yellow-400 hover:opacity-70'}
                                >
                                    H3
                                </button>
                                <button type='button'
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                                    className={editor.isActive('heading', { level: 4 }) ? 'border border-yellow-500 dark:border-cyan-700 rounded-lg px-2 py-1 dark:text-white text-black font-semibold dark:bg-cyan-600 bg-yellow-500 mx-1' : 'border border-yellow-500 dark:border-cyan-700 rounded-lg px-2 py-1 dark:text-white text-black font-semibold mx-1 dark:hover:bg-cyan-700 hover:bg-yellow-400 hover:opacity-70'}
                                >
                                    H4
                                </button>
                                <button type='button'
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                                    className={editor.isActive('heading', { level: 5 }) ? 'border border-yellow-500 dark:border-cyan-700 rounded-lg px-2 py-1 dark:text-white text-black font-semibold dark:bg-cyan-600 bg-yellow-500 mx-1' : 'border border-yellow-500 dark:border-cyan-700 rounded-lg px-2 py-1 dark:text-white text-black font-semibold mx-1 dark:hover:bg-cyan-700 hover:bg-yellow-400 hover:opacity-70'}
                                >
                                    H5
                                </button>
                                <button type='button' onClick={addImage} className="border dark:border-cyan-700 border-yellow-500 rounded-lg px-2 dark:text-white text-black font-semibold mx-1 dark:hover:bg-cyan-700 hover:bg-yellow-400 hover:opacity-70 py-2"><BsImageFill /></button>
                                <button type='button' onClick={() => editor.chain().focus().setHorizontalRule().run()} className="border dark:border-cyan-700 border-yellow-500 rounded-lg px-2 dark:text-white text-black font-semibold mx-1 dark:hover:bg-cyan-700 hover:bg-yellow-400 hover:opacity-70 py-2">
                                    <MdHorizontalRule />
                                </button>
                                <button type='button' onClick={setLink} className={editor.isActive('link') ? 'border border-yellow-500 dark:border-cyan-700 rounded-lg p-2 dark:text-white text-black font-semibold dark:bg-cyan-600 bg-yellow-500 mx-1' : 'border border-yellow-500 dark:border-cyan-700 rounded-lg p-2 dark:text-white text-black font-semibold mx-1 dark:hover:bg-cyan-700 hover:bg-yellow-400 hover:opacity-70'}>
                                    <BiLink />
                                </button>
                                <button type='button' onClick={addYoutubeVideo} className="border dark:border-cyan-700 border-yellow-500 rounded-lg px-2 dark:text-white text-black font-semibold mx-1 dark:hover:bg-cyan-700 hover:bg-yellow-400 hover:opacity-70 py-2">
                                    <BsYoutube />
                                </button>
                                <button type="submit" className="flex items-center md:ml-auto ml-10 border dark:border-green-600 border-yellow-500 rounded-lg px-2 dark:text-white text-black font-semibold mx-1 dark:hover:bg-green-600 hover:border-green-400 hover:bg-yellow-400 py-2 whitespace-nowrap"><BiMailSend className='mr-2' /> Submit Article</button>
                            </div>

                            <EditorContent editor={editor} />
                        </section>
                        <button type='button' onClick={handleDestroy} className="border border-red-500 rounded-lg dark:text-white text-black font-semibold ml-auto hover:bg-red-500 py-2 px-4 mt-4 flex items-center"><AiFillDelete className='mr-2' /> Delete</button>
                    </form>
                </div>
            </main>
            <Toast ref={toast} />
            <Toast ref={toastBC} />
            <Footer />
        </>
    )
}

export default Admin;