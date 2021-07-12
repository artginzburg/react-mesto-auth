import { repository } from '../../package.json';

const repoSeparator = '.';

const repoSplit = repository.url.split(repoSeparator);
repoSplit.pop();

const repoJoined = repoSplit.join(repoSeparator);

export const repo = repoJoined.split('+')[1];
