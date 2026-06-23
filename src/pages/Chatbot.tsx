import React, { useState, useEffect, useRef } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import NavBar from '../components/NavBar';
import kophiLogo from '../assets/kophi.png';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface Module {
    id: number;
    title: string;
    image?: string;
}

const Chat: React.FC = () => {
    const loaderData = useLoaderData() as { initialModules: Module[] };
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [modules, setModules] = useState<Module[]>(loaderData.initialModules || []);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newUserMessage: Message = { role: 'user', content: input };
        setMessages((prevMessages) => [...prevMessages, newUserMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/chat/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: input,
                    sessionId: sessionId,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.sessionId) {
                setSessionId(data.sessionId);
            }
            if (Array.isArray(data.relatedModules) && data.relatedModules.length > 0) {
                setModules(data.relatedModules);
            }
            const newAssistantMessage: Message = { role: 'assistant', content: data.response };
            setMessages((prevMessages) => [...prevMessages, newAssistantMessage]);

        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'assistant', content: 'Lo siento, hubo un error al obtener la respuesta.' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-black flex flex-col font-sans">
            <NavBar />

            <main className="flex-1 pt-24 px-8 pb-12 max-w-7xl mx-auto w-full flex flex-col">
                {/* Back button */}
                <div className="mb-6">
                    <Link to="/" className="inline-flex items-center text-gray-700 hover:text-black transition-colors font-medium">
                        <ChevronLeft className="w-5 h-5 mr-1" /> Back
                    </Link>
                </div>

                {/* Grid Layout: Left chat, Right related modules */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1">

                    {/* Chat Box Container */}
                    <div className="lg:col-span-8 border border-gray-300 rounded-4xl p-6 md:p-8 flex flex-col h-[70vh] bg-white">
                        {/* Messages area */}
                        <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2">
                            {messages.length === 0 && (
                                <div className="text-center text-gray-400 mt-10">
                                    Start a conversation with Kophi
                                </div>
                            )}

                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`px-6 py-4 text-base max-w-[80%] ${msg.role === 'user'
                                            ? 'bg-[#3F75FF] text-white rounded-4xl rounded-tr-none'
                                            : 'bg-[#505050] text-white rounded-4xl rounded-tl-none'
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}

                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-[#505050] text-white px-6 py-4 rounded-4xl rounded-tl-none text-base">
                                        Thinking...
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input bar Form */}
                        <form onSubmit={handleSubmit} className="mt-auto">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={loading}
                                placeholder="Ask Kophi about AI or the modules"
                                className="w-full bg-[#c2c2c2] text-white placeholder-white/80 py-4 px-8 rounded-full border-none outline-none text-lg disabled:opacity-50"
                            />
                        </form>
                    </div>

                    {/* Related Modules Sidebar */}
                    <div className="lg:col-span-4 border border-[#3F75FF] rounded-4xl overflow-hidden bg-white shadow-sm">
                        <div className="bg-[#3F75FF] text-white text-center py-4 font-bold text-xl tracking-wider uppercase">
                            Related Modules
                        </div>
                        <div className="p-6 space-y-4">
                            {modules.map((mod, index) => {
                                const isFirst = index === 0;
                                return (
                                    <Link key={mod.id} to={`/modules/${mod.id}`} className="block">
                                        <div
                                            className={`relative h-[120px] rounded-2xl p-6 flex flex-col justify-between overflow-hidden shadow-sm transition-all hover:scale-[1.02] ${isFirst
                                                ? 'bg-[#6B9DF2] text-white'
                                                : 'bg-white text-gray-700 border border-gray-200'
                                                }`}
                                        >
                                            <div className="z-10">
                                                <h3 className="text-lg font-bold tracking-tight uppercase max-w-[85%] leading-snug font-sans">
                                                    {mod.title}
                                                </h3>
                                            </div>
                                            {/* Absolute positioned icon in bottom right */}
                                            <div className="absolute bottom-0 right-0 w-16 h-16 flex items-end justify-end p-2 pointer-events-none">
                                                <img
                                                    src={kophiLogo}
                                                    alt="Kophi Logo"
                                                    className={`max-w-full max-h-full object-contain ${isFirst ? 'brightness-0 invert' : ''
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                            {modules.length === 0 && (
                                <div className="text-center text-gray-400 py-6">
                                    Loading modules...
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export const chatbotLoader = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/modules');
        const data = await res.json();
        if (Array.isArray(data)) {
            return { initialModules: data.slice(0, 3) };
        }
        return { initialModules: [] };
    } catch (err) {
        console.error("Error in chatbotLoader:", err);
        return { initialModules: [] };
    }
};

export default Chat;