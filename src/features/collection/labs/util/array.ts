/* eslint-disable */
export const stateList = (arr, countryName): any => {
  const result = arr.find((item) => {
    return item.country === countryName
  })
  if (result) return result.state
}
export const districtList = (arr, countryName, stateName): any => {
  const result = arr.find((item) => {
    if (item.country === countryName) {
      return item.state.find((state) => {
        return state === stateName
      })
    }
  })
  if (result) return result.district
}
export const cityList = (arr, countryName, stateName, districtName): any => {
  const result = arr.find((item) => {
    if (item.country === countryName) {
      return item.state.find((state) => {
        if (state === stateName) {
          return item.district.find((district) => {
            return district === districtName
          })
        }
      })
    }
  })
  if (result) return result.city
}

export const areaList = (arr, countryName, stateName, districtName, cityName): any => {
  const result = arr.find((item) => {
    if (item.country === countryName) {
      return item.state.find((state) => {
        if (state === stateName) {
          return item.district.find((district) => {
            if (district === districtName) {
              return item.city.find((city) => {
                return city === cityName
              })
            }
          })
        }
      })
    }
  })
  if (result) return result.area
}
export const postCodeList = (arr, countryName, stateName, districtName, cityName): any => {
    const result = arr.find((item) => {
      if (item.country === countryName) {
        return item.state.find((state) => {
          if (state === stateName) {
            return item.district.find((district) => {
              if (district === districtName) {
                return item.city.find((city) => {
                  return city === cityName
                })
              }
            })
          }
        })
      }
    })
    if (result) return result.postalCode
  }
