//import ResolvedEmails from "./emails/resolvedEmails/ResolvedEmails";
import UnresolvedEmails from "./emails/unresolvedEmails/UnresolvedEmails";

const MainMenuPage = () => {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 h-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-hidden flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Correos sin resolver
          </h3>
          <div className="flex-1 overflow-y-auto">
            <div className="text-gray-400 text-center py-2">
              <UnresolvedEmails />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-hidden flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Correos resueltos
          </h3>
          <div className="flex-1 overflow-y-auto">
            <div className="text-gray-400 text-center py-2">
              <UnresolvedEmails />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenuPage;
