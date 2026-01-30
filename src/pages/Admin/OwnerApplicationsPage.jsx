import React from 'react';
import OwnerApplicationsTable from '../../components/admin/OwnerApplicationsTable';

export default function OwnerApplicationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <OwnerApplicationsTable />
      </div>
    </div>
  );
}
