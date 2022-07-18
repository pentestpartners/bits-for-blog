#!/usr/bin/env python3
import usb.core
import usb.util
import sys
import hexdump

dev=usb.core.find(idVendor=0x18d1, idProduct=0x4ee0)

if dev is None:
	raise ValueError("Fastboot Device not found")

epout=6
epin=0x85
outfile="data.out"
blocksize=4096 * 1024

def send(dev, command):
	dev.write(epout, command)
	ret=0
	while True:
		resp=dev.read(epin, 1000, 1000).tobytes().decode('utf-8')
		header = resp[:4]
		data   = resp[4:]
		if header == "INFO":
			print(f"{data}")
		elif header == "OKAY":
			print(f"Success: {data}")
			break
		elif header == "DATA":
			octets=int(data, 16)
			print(f"Data response, {octets} octets")
			fileout=open(outfile, "wb")
			while octets > 0:
				r=blocksize
				if octets < blocksize: r=octets
				readdata=dev.read(epin, r, 1000)
				fileout.write(readdata)
				octets-=r
			fileout.close()
		else:
			print(f"Error: {data}")
			ret=1
			break
	return ret

success=send(dev, sys.argv[1])
exit(success)
