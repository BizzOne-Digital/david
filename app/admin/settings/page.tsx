import { getSiteSettingsAdminAction } from "@/actions/settings";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function SettingsPage() {
  const result = await getSiteSettingsAdminAction();
  const settings = result.success ? result.data : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Site Settings</h2>
        <p className="text-sm text-silver">Configure global site options</p>
      </div>
      <SettingsForm settings={settings as Parameters<typeof SettingsForm>[0]["settings"]} />
    </div>
  );
}
