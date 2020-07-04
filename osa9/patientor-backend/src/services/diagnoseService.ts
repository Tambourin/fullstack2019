import diagnosedata from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnosedata;

const getEntries = (): Array<Diagnose> => {
    return diagnoses;
};

export default { getEntries };