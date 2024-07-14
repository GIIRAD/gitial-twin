import { Modal, ModalFooter, ModalHeader, ModalSection, Box, Stack, Button } from '@kiwicom/orbit-components'
import { OnChangeProps, JsonView } from 'react-json-view'
import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import { postAAS } from '../hooks/submodall';
import { putAAS } from '../hooks/getAAS';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

const initialJsonDataVibration = {
  "modelType": "Submodel",
  "kind": "Instance",
  "semanticId": {
    "keys": [
      {
        "type": "Submodel",
        "value": "http://acplt.org/SubmodelTemplates/Vibration"
      }
    ],
    "type": "ExternalReference"
  },
  "administration": {
    "version": "1.0"
  },
  "id": "http://acplt.org/Submodels/Assets/ProductionMachine/Vibration",
  "description": [
    {
      "language": "en-us",
      "text": "A vibration submodel for monitoring the vibration of a production machine"
    },
    {
      "language": "de",
      "text": "Ein Vibrations-Submodell zur Überwachung der Vibration einer Produktionsmaschine"
    }
  ],
  "idShort": "Vibration",
  "submodelElements": [
    {
      "modelType": "Property",
      "semanticId": {
        "keys": [
          {
            "type": "GlobalReference",
            "value": "http://acplt.org/Properties/Vibration"
          }
        ],
        "type": "ExternalReference"
      },
      "value": "0.02",
      "valueType": "xs:float",
      "category": "CONSTANT",
      "description": [
        {
          "language": "en-us",
          "text": "The current vibration of the production machine."
        },
        {
          "language": "de",
          "text": "Die aktuelle Vibration der Produktionsmaschine."
        }
      ],
      "idShort": "CurrentVibration",
      "unit": "m/s^2"
    },
    {
      "modelType": "Property",
      "semanticId": {
        "keys": [
          {
            "type": "GlobalReference",
            "value": "http://acplt.org/Properties/VibrationThreshold"
          }
        ],
        "type": "ExternalReference"
      },
      "value": "1.0",
      "valueType": "xs:float",
      "category": "CONSTANT",
      "description": [
        {
          "language": "en-us",
          "text": "The vibration threshold for the production machine."
        },
        {
          "language": "de",
          "text": "Die Vibrationsgrenze für die Produktionsmaschine."
        }
      ],
      "idShort": "VibrationThreshold",
      "unit": "m/s^2"
    }
  ]
}

const JsonEditor: React.FC<{ jsonData: any, setJsonData: React.Dispatch<React.SetStateAction<any>> }> = ({ jsonData, setJsonData }) => {
  const handleEdit = (edit: OnChangeProps) => {
    setJsonData(edit.updated_src);
  };

  return (
    <div>
      <ReactJson
        src={jsonData}
        onEdit={handleEdit}
        onAdd={handleEdit}
        onDelete={handleEdit}
        theme="monokai"
        style={{ padding: '20px', borderRadius: '8px' }}
      />
    </div>
  );
};

type AddTemperaturProps = {
  onClose: () => void;
  aasId: string;
  aas: any;
}

const AddVibration: React.FC<AddTemperaturProps> = ({
  onClose, aasId, aas
}) => {
  const [jsonData, setJsonData] = useState(initialJsonDataVibration);
  return (
    <Modal onClose={() => onClose()}>
      <ModalHeader title='Temperatur hinzufügen' />
      <ModalSection>
        <Box>
          <Stack>
            <JsonEditor jsonData={initialJsonDataVibration} setJsonData={setJsonData} />
          </Stack>
        </Box>
      </ModalSection>
      <ModalFooter>
        <Box display='inline-flex' width='full'>
          <Stack direction='row' align='center' justify='center'>
            <Button
              size='large'
              type='secondary'
              width='50%'
              onClick={() => {
                onClose();
              }}
            >
              Zurück
            </Button>
            <Button
              size='large'
              type='critical'
              width='50%'
              onClick={async () => {
                const submodels = Array.isArray(aas.submodels) ? aas.submodels : [];
                const newAAS = {
                  ...aas,
                  submodels: [...submodels, jsonData]
                };
                console.log(newAAS);
                await postAAS(jsonData);
                await putAAS(aasId, newAAS);
                onClose();
              }}
            >
              Absenden
            </Button>
          </Stack>
        </Box>
      </ModalFooter>
    </Modal>
  )
}

export default AddVibration