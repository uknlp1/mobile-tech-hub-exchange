
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Device } from "@/utils/storage";

interface EditDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  device: Device;
  onUpdateDevice: (deviceId: string, updates: Partial<Device>) => void;
}

const EditDeviceModal = ({ isOpen, onClose, device, onUpdateDevice }: EditDeviceModalProps) => {
  const [deviceData, setDeviceData] = useState({
    type: "",
    brand: "",
    model: "",
    condition: "",
    storage: "",
    ram: "",
    price: "",
    originalPrice: "",
    images: [] as string[]
  });

  useEffect(() => {
    if (device) {
      setDeviceData({
        type: device.type || "",
        brand: device.brand || "",
        model: device.model || "",
        condition: device.condition || "",
        storage: device.storage || "",
        ram: device.ram || "",
        price: device.price?.toString() || "",
        originalPrice: device.originalPrice?.toString() || "",
        images: device.images || []
      });
    }
  }, [device]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setDeviceData({
        ...deviceData,
        images: [...deviceData.images, ...imageUrls].slice(0, 3)
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = deviceData.images.filter((_, i) => i !== index);
    setDeviceData({ ...deviceData, images: newImages });
  };

  const handleUpdateDevice = () => {
    const updates = {
      ...deviceData,
      price: parseInt(deviceData.price),
      originalPrice: parseInt(deviceData.originalPrice)
    };
    
    onUpdateDevice(device.id, updates);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Device</DialogTitle>
          <DialogDescription className="text-gray-300">
            Update device information and specifications
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Device Type</Label>
              <Select value={deviceData.type} onValueChange={(value) => setDeviceData({...deviceData, type: value})}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="laptop">Laptop</SelectItem>
                  <SelectItem value="tv">TV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-300">Brand</Label>
              <Input 
                value={deviceData.brand}
                onChange={(e) => setDeviceData({...deviceData, brand: e.target.value})}
                className="bg-gray-700 border-gray-600 text-white" 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Model</Label>
              <Input 
                value={deviceData.model}
                onChange={(e) => setDeviceData({...deviceData, model: e.target.value})}
                className="bg-gray-700 border-gray-600 text-white" 
              />
            </div>
            <div>
              <Label className="text-gray-300">Storage</Label>
              <Input 
                placeholder="e.g., 256GB" 
                value={deviceData.storage}
                onChange={(e) => setDeviceData({...deviceData, storage: e.target.value})}
                className="bg-gray-700 border-gray-600 text-white" 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">RAM</Label>
              <Input 
                placeholder="e.g., 8GB" 
                value={deviceData.ram}
                onChange={(e) => setDeviceData({...deviceData, ram: e.target.value})}
                className="bg-gray-700 border-gray-600 text-white" 
              />
            </div>
            <div>
              <Label className="text-gray-300">Condition</Label>
              <Select value={deviceData.condition} onValueChange={(value) => setDeviceData({...deviceData, condition: value})}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Price (ZAR)</Label>
              <Input 
                type="number" 
                value={deviceData.price}
                onChange={(e) => setDeviceData({...deviceData, price: e.target.value})}
                className="bg-gray-700 border-gray-600 text-white" 
              />
            </div>
            <div>
              <Label className="text-gray-300">Original Price (ZAR)</Label>
              <Input 
                type="number" 
                value={deviceData.originalPrice}
                onChange={(e) => setDeviceData({...deviceData, originalPrice: e.target.value})}
                className="bg-gray-700 border-gray-600 text-white" 
              />
            </div>
          </div>
          <div>
            <Label className="text-gray-300">Device Images (up to 3)</Label>
            <div className="space-y-2">
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="bg-gray-700 border-gray-600 text-white"
              />
              {deviceData.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {deviceData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img src={image} alt={`Device ${index + 1}`} className="w-full h-20 object-cover rounded" />
                      <Button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 p-0 text-xs"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Button 
            onClick={handleUpdateDevice}
            className="w-full bg-lemon hover:bg-lemon-dark text-black"
          >
            Update Device
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditDeviceModal;
