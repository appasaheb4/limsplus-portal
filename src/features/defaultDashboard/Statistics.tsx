import React from "react"
import {  Card, CardBody, Media } from "reactstrap"
import { observer } from "mobx-react"

import { Activity, DollarSign, ShoppingBag, Users } from "react-feather"
import { useStores } from "@lp/stores"

const Statistics = observer(() => {
  const { userStore } = useStores()
  return (
    <div>
      <div className="grid  sm:grid-cols-1 md:grid-cols-4 gap-2">
        <Card className="flex">
          <CardBody className="py-4">
            <Media>
              <div className="d-inline-block mt-2 mr-3">
                <Users className="feather-lg text-primary" />
              </div>
              <Media body>
                <h3 className="mb-2">{userStore.userListCount}</h3>
                <div className="mb-0">Total number of Users in the System</div>
              </Media>
            </Media>
          </CardBody>
        </Card>

        <Card className="flex">
          <CardBody className="py-4">
            <Media>
              <div className="d-inline-block mt-2 mr-3">
                <Activity className="feather-lg text-warning" />
              </div>
              <Media body>
                <h3 className="mb-2">17.212</h3>
                <div className="mb-0">Visitors Today</div>
              </Media>
            </Media>
          </CardBody>
        </Card>

        <Card className="flex">
          <CardBody className="py-4">
            <Media>
              <div className="d-inline-block mt-2 mr-3">
                <DollarSign className="feather-lg text-success" />
              </div>
              <Media body>
                <h3 className="mb-2">$ 24.300</h3>
                <div className="mb-0">Total Earnings</div>
              </Media>
            </Media>
          </CardBody>
        </Card>
        <Card className="flex">
          <CardBody className="py-4">
            <Media>
              <div className="d-inline-block mt-2 mr-3">
                <ShoppingBag className="feather-lg text-danger" />
              </div>
              <Media body>
                <h3 className="mb-2">43</h3>
                <div className="mb-0">Pending Orders</div>
              </Media>
            </Media>
          </CardBody>
        </Card>

        <Card className="flex">
          <CardBody className="py-4">
            <Media>
              <div className="d-inline-block mt-2 mr-3">
                <DollarSign className="feather-lg text-info" />
              </div>
              <Media body>
                <h3 className="mb-2">$ 18.700</h3>
                <div className="mb-0">Total Revenue</div>
              </Media>
            </Media>
          </CardBody>
        </Card>
</div>
    </div>
  )
})

export default Statistics
