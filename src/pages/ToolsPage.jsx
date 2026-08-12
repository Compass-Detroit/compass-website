import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '@/layouts/PageLayout';
import { FaEnvelope, FaPalette, FaMicrophone, FaCamera, FaHandshake, FaChartBar, FaQrcode, FaPen } from 'react-icons/fa6';

const tools = [
  {
    name: 'Newsletter Studio',
    icon: FaEnvelope,
    status: 'Active',
    route: '/tools/newsletter',
    description: 'Compose and send community newsletters',
  },
  {
    name: 'Social Card Generator',
    icon: FaPalette,
    status: 'Active',
    route: '/tools/social-cards',
    description: 'Generate branded social media cards',
  },
  {
    name: 'Speaker Submissions',
    icon: FaMicrophone,
    status: 'Active',
    route: '/submit-talk',
    description: 'Submit and review CFS proposals',
  },
  {
    name: 'Photo Gallery Manager',
    icon: FaCamera,
    status: 'Active',
    route: '/tools/gallery',
    description: 'Upload, tag, and organize event photos',
  },
  {
    name: 'Subscriber Analytics',
    icon: FaChartBar,
    status: 'Active',
    route: '/tools/subscribers',
    description: 'Newsletter subscriber analytics dashboard',
  },
  {
    name: 'Sponsor Dashboard',
    icon: FaHandshake,
    status: 'Coming Soon',
    route: '#',
    description: 'Track partner details and deliverables',
  },
  {
    name: 'QR Code Generator',
    icon: FaQrcode,
    status: 'Active',
    route: '/tools/qr',
    description: 'Generate branded QR codes',
  },
  {
    name: 'Event Content Editor',
    icon: FaPen,
    status: 'Coming Soon',
    route: '#',
    description: 'Edit event descriptions and schedules',
  },
];

const ToolsPage = () => {
  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-white pt-24 pb-32 dark:bg-gray-900">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-70"></div>
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              COMPASS Detroit <span className="text-primary">Team Tools</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Internal hub for event management and community operations.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              const isActive = tool.status === 'Active';

              const CardContent = (
                <div className={`relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800 ${isActive ? 'hover:ring-2 hover:ring-primary/50' : 'opacity-75 grayscale-[30%]'}`}>
                  <div className="mb-4 flex items-start justify-between">
                    <div className={`inline-flex rounded-xl p-3 ${isActive ? 'bg-primary/10 text-primary-600 dark:bg-primary/20 dark:text-primary-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
                      <Icon className="size-6" />
                    </div>
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${isActive ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                      {tool.status}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{tool.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow">{tool.description}</p>
                  
                  {!isActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/5 backdrop-blur-[1px] dark:bg-white/5 rounded-2xl pointer-events-none">
                      <span className="rounded-lg bg-gray-900/80 px-3 py-1.5 text-sm font-semibold text-white shadow-sm backdrop-blur-sm dark:bg-gray-100/90 dark:text-gray-900">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>
              );

              return isActive ? (
                <Link key={index} to={tool.route} className="block group h-full">
                  {CardContent}
                </Link>
              ) : (
                <div key={index} className="block h-full cursor-not-allowed">
                  {CardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ToolsPage;
