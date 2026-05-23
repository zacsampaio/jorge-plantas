import { TabButton, TabsContainer } from "./styled";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  ariaLabel?: string;
}

export function Tabs({ tabs, activeTab, onChange, ariaLabel }: TabsProps) {
  return (
    <TabsContainer role="tablist" aria-label={ariaLabel}>
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          role="tab"
          type="button"
          $active={activeTab === tab.id}
          aria-selected={activeTab === tab.id}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </TabButton>
      ))}
    </TabsContainer>
  );
}
