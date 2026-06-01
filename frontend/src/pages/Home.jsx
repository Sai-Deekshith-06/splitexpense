import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Receipt, 
  RefreshCcw, 
  ChartNoAxesColumn, 
  CheckCircle, 
  ShieldCheck, 
  Zap, 
  Heart,
  ChevronRight,
  Play,
  Star
} from 'lucide-react';
import homepagePic from '../assets/homepagepic.png';
import logo from '../assets/logo.jpeg';

const Home = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-red/10 selection:text-brand-red">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Split Expense Logo" className="w-10 h-10 object-contain rounded-lg" />
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Split <span className="text-brand-red">Expense</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-gray-600 hover:text-brand-red transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-brand-red transition-colors">How it Works</a>
              <a href="#about" className="text-sm font-medium text-gray-600 hover:text-brand-red transition-colors">About Us</a>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-brand-red px-4 py-2 rounded-lg border border-gray-200 hover:border-brand-red transition-all">
                Log In
              </Link>
              <Link to="/register" className="text-sm font-medium text-white bg-brand-red hover:bg-red-700 px-5 py-2 rounded-lg shadow-sm shadow-brand-red/20 transition-all">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-48 lg:pb-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="lg:col-span-6 text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Split expenses. <br />
                <span className="text-brand-red">Stay friends.</span>
              </h1>
              <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto lg:mx-0">
                The simplest way to split bills, track expenses, and settle up with your group. Perfect for trips, roommates, and outings.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-brand-red text-white font-bold rounded-xl shadow-lg shadow-brand-red/30 hover:bg-brand-red/90 hover:-translate-y-0.5 transition-all text-lg">
                  Get Started
                </Link>
                <button className="w-full sm:w-auto px-8 py-4 flex items-center justify-center gap-2 text-gray-700 font-bold border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-all text-lg">
                  <Play className="w-5 h-5 fill-current" />
                  Watch Demo
                </button>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i}
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white" 
                      src={`https://i.pravatar.cc/150?u=${i}`} 
                      alt="" 
                    />
                  ))}
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-medium">Trusted by 50K+ groups</p>
                </div>
              </div>
            </div>

            <div className="mt-16 lg:mt-0 lg:col-span-6 relative">
              <div className="relative group perspective-1000">
                <img 
                  src={homepagePic} 
                  alt="Split Expense App" 
                  className="w-full h-auto rounded-3xl shadow-2xl transition-transform duration-700 group-hover:rotate-1"
                />
                <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl"></div>
                <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-brand-red/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Bar */}
      <section className="py-24 mx-30 bg-brand-red-light/50 border-y border-brand-red/5" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, title: "Create or Join Groups", desc: "Travel, friends, flatmates or family" },
              { icon: Receipt, title: "Add Expenses in Seconds", desc: "Quickly track who paid and what" },
              { icon: RefreshCcw, title: "Settle Up Easily", desc: "Request or pay instantly via UPI" },
              { icon: ChartNoAxesColumn, title: "Track & Settle", desc: "Keep track of balances clearly" }
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-sm transition-all group">
                <div className="p-3 bg-white rounded-xl shadow-sm text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors">
                  <f.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-brand-red transition-colors">{f.title}</h3>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-gray-500">Get started in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
             {/* Connector lines (desktop) */}
             <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-brand-red/20 -translate-y-1/2 -z-10"></div>

            {[
              { step: "1", title: "Create a group", desc: "Create a new group or join an existing one with your friends." },
              { step: "2", title: "Add expenses", desc: "Add expenses and select who paid and who participated." },
              { step: "3", title: "Settle up", desc: "View balances and settle up instantly using UPI payments." }
            ].map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 text-center relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-brand-red text-white flex items-center justify-center rounded-full font-bold shadow-md">
                  {s.step}
                </div>
                <div className="mt-4 flex justify-center mb-6">
                   <div className="w-16 h-16 bg-brand-red/5 rounded-2xl flex items-center justify-center text-brand-red">
                     {i === 0 && <Users className="w-8 h-8" />}
                     {i === 1 && <Receipt className="w-8 h-8" />}
                     {i === 2 && <Zap className="w-8 h-8" />}
                   </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us / Why Section */}
      <section className="py-24 bg-gray-50" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">About Us</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Split Expense was built to end the hassle of splitting bills and tracking who owes what. 
                  Whether it's a trip, dinner, or monthly rent, we make group expenses simple, transparent, and stress-free.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-brand-red">50K+</span>
                    <span className="text-sm font-medium text-gray-500">Happy Groups</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-brand-red">100%</span>
                    <span className="text-sm font-medium text-gray-500">Secure & Private</span>
                  </div>
                </div>
              </div>

              <div className="mt-12 lg:mt-0 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: ShieldCheck, title: "Secure & Private", color: "bg-blue-50 text-blue-600" },
                  { icon: Zap, title: "Instant UPI", color: "bg-purple-50 text-purple-600" },
                  { icon: CheckCircle, title: "Accurate History", color: "bg-green-50 text-green-600" },
                  { icon: Heart, title: "Made with Love", color: "bg-pink-50 text-pink-600" }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${item.color}`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-gray-800">{item.title}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-red rounded-[3rem] px-8 py-16 lg:p-20 text-center relative overflow-hidden">
             {/* Decorative circles */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
             
             <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 relative">
               Ready to simplify your <br className="hidden sm:block" /> group expenses?
             </h2>
             <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto relative">
               Join thousands of users who trust Split Expense to manage their group finances perfectly.
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
               <Link to="/register" className="w-full sm:w-auto px-10 py-4 bg-white text-brand-red font-bold rounded-xl shadow-lg hover:bg-gray-50 hover:-translate-y-0.5 transition-all">
                 Sign Up Now
               </Link>
               <Link to="/login" className="w-full sm:w-auto px-10 py-4 bg-brand-red border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all">
                 Log In
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="flex items-center gap-2 grayscale brightness-50 opacity-50">
                <img src={logo} alt="Split Expense Logo" className="w-8 h-8 object-contain rounded" />
                <span className="text-sm font-bold tracking-tight text-gray-900">
                  Split Expense
                </span>
             </div>
             
             <div className="flex items-center gap-8 text-sm font-medium text-gray-500">
               <a href="#" className="hover:text-brand-red transition-colors">Terms of Service</a>
               <a href="#" className="hover:text-brand-red transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-brand-red transition-colors">Support</a>
             </div>
             
             <p className="text-sm text-gray-400">
               © 2024 Split Expense. All rights reserved.
             </p>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;