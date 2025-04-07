
import React from 'react';

interface TabContentProps {
  title: string;
  description: string;
}

const TabContent = ({ title, description }: TabContentProps) => {
  return (
    <div className="bg-card rounded-lg shadow-subtle overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default TabContent;
