import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ClothingItem, MehndiDesign } from '../backend';

export function useClothingItems() {
  const { actor, isFetching } = useActor();
  return useQuery<ClothingItem[]>({
    queryKey: ['clothingItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getClothingItemsByPrice();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMehndiDesigns() {
  const { actor, isFetching } = useActor();
  return useQuery<MehndiDesign[]>({
    queryKey: ['mehndiDesigns'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMehndiDesignsByPrice();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBusinessInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<{ phone: string; location: string }>({
    queryKey: ['businessInfo'],
    queryFn: async () => {
      if (!actor) return { phone: '', location: '' };
      return actor.getBusinessInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContactMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, phone, email, message }: { name: string; phone: string; email: string; message: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitContactMessage(name, phone, email, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
    },
  });
}

// Appointment booking is stored via contact message as backend doesn't have a separate appointment table
export function useSubmitAppointment() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({ name, phone, date, time, service }: { name: string; phone: string; date: string; time: string; service: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      const message = `Appointment Request - Service: ${service}, Date: ${date}, Time: ${time}`;
      return actor.submitContactMessage(name, phone, '', message);
    },
  });
}

// Order submission stored via contact message as backend doesn't have a separate orders table
export function useSubmitOrder() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({ name, phone, address, product }: { name: string; phone: string; address: string; product: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      const message = `Order Request - Product: ${product}, Address: ${address}`;
      return actor.submitContactMessage(name, phone, '', message);
    },
  });
}
