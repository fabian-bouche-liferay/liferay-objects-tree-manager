import { useState, useCallback } from 'react';

export const useTreeData = (treeService) => {
    
    const [trees, setTrees] = useState();

    const loadTreeData = useCallback(() => {

        treeService.getTrees().then(data => {
            setTrees(data);
        });

    });

    return { trees, loadTreeData };
};