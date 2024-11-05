def left_to_center(coordinate):
    '''
    边框左上角坐标，转边框中心坐标
    '''
    coordinate_2 = [coordinate[0]+coordinate[2]/2, coordinate[1] +
                    coordinate[3]/2, coordinate[2], coordinate[3]]
    return coordinate_2


def center_to_left(coordinate):
    '''
    边框中心坐标，转边框左上角坐标
    '''
    coordinate_2 = [coordinate[0]-coordinate[2]/2, coordinate[1] -
                    coordinate[3]/2, coordinate[2], coordinate[3]]
    return coordinate_2
