import { Modal, ModalFooter, ModalHeader, ModalSection, Box, Stack, Button } from '@kiwicom/orbit-components'
import { OnChangeProps, JsonView } from 'react-json-view'
import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import { postAAS } from '../hooks/submodall';
import { putAAS } from '../hooks/getAAS';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

const initialJsonDataOperationHours = {
  "modelType": "Submodel",
  "kind": "Instance",
  "semanticId": {
    "keys": [
      {
        "type": "Submodel",
        "value": "http://acplt.org/SubmodelTemplates/OperationHours"
      }
    ],
    "type": "ExternalReference"
  },
  "administration": {
    "version": "1.0"
  },
  "id": "http://acplt.org/Submodels/Assets/ProductionMachine/OperationHours",
  "description": [
    {
      "language": "en-us",
      "text": "An operation hours submodel for monitoring the operation hours of a production machine"
    },
    {
      "language": "de",
      "text": "Ein Betriebsstunden-Submodell zur Überwachung der Betriebsstunden einer Produktionsmaschine"
    }
  ],
  "idShort": "OperationHours",
  "submodelElements": [
    {
      "modelType": "Property",
      "semanticId": {
        "keys": [
          {
            "type": "GlobalReference",
            "value": "http://acplt.org/Properties/OperationHours"
          }
        ],
        "type": "ExternalReference"
      },
      "value": "1200",
      "valueType": "xs:integer",
      "category": "CONSTANT",
      "description": [
        {
          "language": "en-us",
          "text": "The total operation hours of the production machine."
        },
        {
          "language": "de",
          "text": "Die gesamten Betriebsstunden der Produktionsmaschine."
        }
      ],
      "idShort": "TotalOperationHours",
      "unit": "hours"
    },
    {
      "modelType": "Property",
      "semanticId": {
        "keys": [
          {
            "type": "GlobalReference",
            "value": "http://acplt.org/Properties/MaintenanceThreshold"
          }
        ],
        "type": "ExternalReference"
      },
      "value": "2000",
      "valueType": "xs:integer",
      "category": "CONSTANT",
      "description": [
        {
          "language": "en-us",
          "text": "The operation hours threshold for maintenance."
        },
        {
          "language": "de",
          "text": "Die Betriebsstundengrenze für die Wartung."
        }
      ],
      "idShort": "MaintenanceThreshold",
      "unit": "hours"
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

const AddHours: React.FC<AddTemperaturProps> = ({
  onClose, aasId, aas
}) => {
  const [jsonData, setJsonData] = useState(initialJsonDataOperationHours);
  return (
    <Modal onClose={() => onClose()}>
      <ModalHeader title='Temperatur hinzufügen' />
      <ModalSection>
        <Box>
          <Stack>
            <JsonEditor jsonData={initialJsonDataOperationHours} setJsonData={setJsonData} />
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

export default AddHours