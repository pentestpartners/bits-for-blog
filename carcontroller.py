import can
import pygetwindow
import time
from pynput.keyboard import Key, Controller
from dataclasses import dataclass
from threading import Thread

@dataclass
class CarController:
	# Controller state object
	throttle: int = 0
	brake: int = 0
	steering: int = 0

	def AsDictionary(this):
		return {
			"throttle": this.throttle,
			"brake":	this.brake,
			"steering": this.steering
		}

def CANThread(car: CarController):
	with can.Bus(interface='kvaser', channel=0, bitrate=500000) as bus:
		for msg in bus:
			msg_handle(car, msg)	

	
def msg_handle(car: CarController, msg):
	match msg.arbitration_id:
		case 0x0c6:
			# steering
			# only take the first octet
			# 0x80 = straight, 0x81 = left, 0x7f = right
			car.steering=0
			steer=(msg.data[0]*256)+msg.data[1]
			#print(f"{steer:02x}")
			if steer > 0x80d0:
				car.steering=-1
			elif steer < 0x8030:
				car.steering=1
		case 0x1f6:
			# brake
			# octet 3, bit 3
			car.brake=0
			if (msg.data[2] & 0x08) != 0:
				car.brake=1

		case 0x186:
			# throttle
			# octet 4 > 0x51
			car.throttle=0
			if msg.data[4] > 0x60:
				car.throttle=1

keyboard = Controller()
input("Ready?")
#app = pygetwindow.getWindowsWithTitle("SuperTuxKart")
#app[0].activate()

# Instance the state object
car = CarController()

# run the CAN handler in a separate thread
can_thread = Thread(target=CANThread, args=(car,))
can_thread.daemon = True
can_thread.start()

# Now poll for keys
while True:
	time.sleep(1 / 20)
	state=car.AsDictionary()
	if state["throttle"]:
		keyboard.press(Key.up)
	else:
		keyboard.release(Key.up)
	if state["brake"]:
		keyboard.press(Key.down)
	else:
		keyboard.release(Key.down)		
	if state["steering"] == -1:
		keyboard.press(Key.left)
	else:
		keyboard.release(Key.left)
	if state["steering"] == 1:
		keyboard.press(Key.right)
	else:
		keyboard.release(Key.right)
	



