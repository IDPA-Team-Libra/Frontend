import { Tree } from '@angular-devkit/schematics';
import { WorkspaceProject } from '@angular-devkit/core/src/experimental/workspace';
/**
 * Gets project workspace from the specified tree by given project name
 * */
export declare function getProject(tree: Tree, projectName: string): WorkspaceProject;
