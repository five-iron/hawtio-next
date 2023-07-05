import { PluginNodeSelectionContext } from '@hawtiosrc/plugins/context'
import { isEmpty } from '@hawtiosrc/util/objects'
import { Card, CardBody, DataList, Text } from '@patternfly/react-core'
import { InfoCircleIcon } from '@patternfly/react-icons'
import React, { useContext } from 'react'
import { OperationForm } from './OperationForm'
import './Operations.css'
import { createOperations } from './operation'

export const Operations: React.FunctionComponent = () => {
  const { selectedNode } = useContext(PluginNodeSelectionContext)

  if (!selectedNode || !selectedNode.objectName || !selectedNode.mbean) {
    return null
  }

  const { objectName, mbean } = selectedNode

  if (!mbean.op || isEmpty(mbean.op)) {
    return (
      <Card>
        <CardBody>
          <Text component='p'>
            <InfoCircleIcon /> This MBean has no JMX operations.
          </Text>
        </CardBody>
      </Card>
    )
  }

  const operations = createOperations(objectName, mbean.op)

  const OperationList = () => (
    <DataList id='jmx-operation-list' aria-label='operation list' isCompact>
      {operations.map(op => (
        <OperationForm key={op.name} name={op.name} operation={op} />
      ))}
    </DataList>
  )

  return (
    <Card isFullHeight>
      <CardBody>
        <Text component='p'>
          This MBean supports the following JMX operations. Expand an item in the list to invoke that operation.
        </Text>
      </CardBody>
      <CardBody>
        <OperationList />
      </CardBody>
    </Card>
  )
}
