import { PageLayout } from "@/components/app/page-layout/page-layout";

export const MeHome = () => {
  return (
    <PageLayout>
      <div className="min-h-screen bg-white">
        <div className="mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Getting Started
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Frontendly is a platform for creating interactive tutorials that
              combine structured lessons with hands-on coding experience.
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each lesson includes detailed text content and a complete file
              set, allowing creators to build step-by-step learning journeys for
              modern frontend development.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
